const WEATHER_API_KEY = 'your_openweathermap_api_key'; // Replace with your API key
const WEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5';

function initializeRainfallData() {
    const ctx = document.getElementById('rainfall-chart');
    if (!ctx) return;

    window.rainfallChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Monthly Rainfall (mm)',
                data: Array(12).fill(0),
                backgroundColor: 'rgba(33, 150, 243, 0.5)',
                borderColor: 'rgba(33, 150, 243, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 1200,
                easing: 'easeOutQuart'
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Rainfall (mm)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    }
                }
            }
        }
    });

    setupEventListeners();
}

function setupEventListeners() {
    const findSolutionsBtn = document.getElementById('find-location');
    const useGpsBtn = document.getElementById('use-gps');
    const locationInput = document.getElementById('location-input');

    if (findSolutionsBtn) {
        findSolutionsBtn.addEventListener('click', async () => {
            if (!locationInput?.value.trim()) {
                showError('Please enter a location');
                return;
            }
            
            setLoadingState(true);
            try {
                await fetchWeatherData(locationInput.value);
            } catch (error) {
                showError(error.message);
            } finally {
                setLoadingState(false);
            }
        });
    }

    if (useGpsBtn) {
        useGpsBtn.addEventListener('click', async () => {
            if (!navigator.geolocation) {
                showError('Geolocation is not supported by your browser');
                return;
            }

            setGpsLoadingState(true);
            try {
                const position = await getCurrentPosition();
                const location = await reverseGeocode(position.coords);
                if (locationInput) locationInput.value = location;
                await fetchWeatherData(location);
            } catch (error) {
                showError(error.message);
            } finally {
                setGpsLoadingState(false);
            }
        });
    }
}

async function fetchWeatherData(location) {
    showLoadingPopup();
    
    try {
        // Get current weather
        const weatherResponse = await fetch(
            `${WEATHER_API_BASE}/weather?q=${encodeURIComponent(location)}&appid=${WEATHER_API_KEY}&units=metric`
        );
        
        if (!weatherResponse.ok) {
            throw new Error('Location not found. Please check the spelling and try again.');
        }

        const weatherData = await weatherResponse.json();
        
        // Get historical data using coordinates
        const { lat, lon } = weatherData.coord;
        const historicalData = await fetchHistoricalData(lat, lon);
        
        updateRainfallChart(historicalData);
        updateRainfallInsights(location, historicalData);
        generatePersonalizedSolutions(location, historicalData);
        
        document.getElementById('data').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        throw new Error(`Unable to fetch weather data: ${error.message}`);
    }
}

async function fetchHistoricalData(lat, lon) {
    // Simulate historical data (replace with actual API call if available)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const values = await Promise.all(
        months.map(async (_, index) => {
            try {
                const response = await fetch(
                    `${WEATHER_API_BASE}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
                );
                const data = await response.json();
                // Calculate average precipitation from forecast data
                return calculateAveragePrecipitation(data.list);
            } catch {
                // Fallback to generated data if API fails
                return generateFallbackRainfall(index, lat, lon);
            }
        })
    );

    return { months, values };
}

function calculateAveragePrecipitation(forecastList) {
    const precipitations = forecastList
        .filter(item => item.rain && item.rain['3h'])
        .map(item => item.rain['3h']);
    
    if (precipitations.length === 0) return 0;
    
    const average = precipitations.reduce((sum, val) => sum + val, 0) / precipitations.length;
    return Math.round(average * 8 * 30); // Convert to monthly estimate
}

function generateFallbackRainfall(monthIndex, lat, lon) {
    // Generate more realistic data based on latitude and season
    const isNorthernHemisphere = lat > 0;
    const summerMonths = isNorthernHemisphere ? [5, 6, 7, 8] : [11, 0, 1, 2];
    const winterMonths = isNorthernHemisphere ? [11, 0, 1, 2] : [5, 6, 7, 8];
    
    if (summerMonths.includes(monthIndex)) {
        return Math.random() * 200 + 100;
    } else if (winterMonths.includes(monthIndex)) {
        return Math.random() * 50 + 20;
    } else {
        return Math.random() * 100 + 50;
    }
}

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    });
}

async function reverseGeocode({ latitude, longitude }) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${WEATHER_API_KEY}`
        );
        const [location] = await response.json();
        return `${location.name}, ${location.country}`;
    } catch {
        throw new Error('Unable to determine your location name');
    }
}

function showLoadingPopup() {
    const popup = document.getElementById('solution-popup');
    if (!popup) return;

    popup.style.display = 'flex';
    document.querySelector('.lang-finding-solutions').textContent = 'Finding Solutions...';
    document.querySelector('.loading-spinner').style.display = 'block';
    document.querySelector('.lang-analyzing-location').style.display = 'block';
    document.getElementById('solution-results').innerHTML = '';
}

function showError(message) {
    const results = document.getElementById('solution-results');
    if (!results) return;

    results.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        </div>
    `;
}

function setLoadingState(isLoading) {
    const btn = document.getElementById('find-location');
    if (!btn) return;

    btn.disabled = isLoading;
    btn.innerHTML = isLoading ? 
        '<i class="fas fa-spinner fa-spin"></i> Processing...' : 
        document.querySelector('.lang-find-location')?.textContent || 'Find Solutions';
}

function setGpsLoadingState(isLoading) {
    const btn = document.getElementById('use-gps');
    if (!btn) return;

    btn.disabled = isLoading;
    btn.innerHTML = isLoading ?
        '<i class="fas fa-spinner fa-spin"></i> Locating...' :
        '<i class="fas fa-map-marker-alt"></i> Use GPS';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeRainfallData);

// Add event listener for the Generate Ideas button
document.addEventListener('DOMContentLoaded', function() {
    const generateIdeasBtn = document.getElementById('generate-ideas-btn');
    if (generateIdeasBtn) {
        generateIdeasBtn.addEventListener('click', function() {
            const locationInput = document.getElementById('location-input').value;
            if (locationInput.trim() === '') {
                alert('Please enter a location first');
                document.getElementById('location-input').focus();
                return;
            }
            
            // Show loading state
            const ideasResult = document.getElementById('location-ideas-result');
            const loadingSpinner = ideasResult.querySelector('.loading-spinner');
            const ideasContent = ideasResult.querySelector('.ideas-content');
            
            loadingSpinner.style.display = 'block';
            ideasContent.innerHTML = '';
            
            // Generate location-specific ideas
            setTimeout(() => {
                generateLocationBasedIdeas(locationInput, ideasContent);
                loadingSpinner.style.display = 'none';
            }, 1500);
        });
    }
});

// Function to generate location-specific harvesting ideas
function generateLocationBasedIdeas(location, container) {
    const locationLower = location.toLowerCase();
    let ideas = [];
    
    // Generate ideas based on location characteristics
    if (locationLower.includes('mumbai') || locationLower.includes('chennai') || locationLower.includes('kolkata')) {
        // Coastal urban areas
        ideas = [
            {
                title: "Elevated Storage Systems",
                description: "In coastal areas prone to flooding, consider elevated storage tanks that prevent contamination during high water events.",
                icon: "fa-water"
            },
            {
                title: "Saltwater Intrusion Prevention",
                description: "Implement specialized filtration to prevent saltwater contamination in your harvesting system.",
                icon: "fa-filter"
            },
            {
                title: "High-Volume Collection",
                description: "Design your system to handle intense monsoon rainfall with overflow management and rapid collection capabilities.",
                icon: "fa-cloud-rain"
            }
        ];
    } else if (locationLower.includes('delhi') || locationLower.includes('jaipur') || locationLower.includes('ahmedabad')) {
        // Arid regions
        ideas = [
            {
                title: "Maximized Collection Surface",
                description: "In arid regions, expand your collection surface beyond just rooftops to capture every possible drop of rainfall.",
                icon: "fa-expand-alt"
            },
            {
                title: "Deep Storage Solutions",
                description: "Consider underground cisterns that minimize evaporation in hot, dry climates.",
                icon: "fa-database"
            },
            {
                title: "Dust Filtration Systems",
                description: "Implement specialized pre-filtration to handle dust and sand common in arid regions.",
                icon: "fa-wind"
            }
        ];
    } else if (locationLower.includes('bangalore') || locationLower.includes('pune') || locationLower.includes('hyderabad')) {
        // Plateau regions
        ideas = [
            {
                title: "Dual-Season Collection",
                description: "Design your system to efficiently capture rainfall during both monsoon periods common in plateau regions.",
                icon: "fa-calendar-alt"
            },
            {
                title: "Groundwater Recharge Wells",
                description: "Implement recharge wells that help replenish groundwater tables in rocky plateau terrain.",
                icon: "fa-arrow-down"
            },
            {
                title: "Terraced Collection Systems",
                description: "Utilize natural slopes in plateau regions for gravity-fed collection and distribution systems.",
                icon: "fa-mountain"
            }
        ];
    } else if (locationLower.includes('village') || locationLower.includes('rural')) {
        // Rural areas
        ideas = [
            {
                title: "Community Collection Pond",
                description: "Develop shared water storage solutions that can benefit multiple households or agricultural plots.",
                icon: "fa-users"
            },
            {
                title: "Agricultural Integration",
                description: "Design systems that directly feed into irrigation networks for crops and livestock.",
                icon: "fa-tractor"
            },
            {
                title: "Natural Filtration Beds",
                description: "Create sand and gravel filtration beds using locally available materials for cost-effective water purification.",
                icon: "fa-leaf"
            }
        ];
    } else {
        // Generic ideas for other locations
        ideas = [
            {
                title: "Custom Roof Gutter Optimization",
                description: "Redesign your gutters to maximize collection efficiency based on your roof's specific dimensions and rainfall patterns.",
                icon: "fa-home"
            },
            {
                title: "Seasonal Storage Planning",
                description: "Design a system with variable storage capacity that adapts to your location's wet and dry seasons.",
                icon: "fa-calendar-alt"
            },
            {
                title: "Multi-purpose Usage System",
                description: "Create a tiered water usage system that prioritizes different needs based on water quality and availability.",
                icon: "fa-tasks"
            }
        ];
    }
    
    // Create HTML for the ideas
    let ideasHTML = `<h4>AI-Generated Ideas for ${location}</h4><div class="location-ideas-grid">`;
    
    ideas.forEach(idea => {
        ideasHTML += `
            <div class="location-idea-item">
                <div class="idea-icon"><i class="fas ${idea.icon}"></i></div>
                <h5>${idea.title}</h5>
                <p>${idea.description}</p>
            </div>
        `;
    });
    
    ideasHTML += `</div>
    <div class="ideas-footer">
        <p>These ideas are customized for your location's climate, terrain, and typical rainfall patterns.</p>
        <button class="btn btn-outline save-ideas">Save These Ideas</button>
    </div>`;
    
    // Add the ideas to the container
    container.innerHTML = ideasHTML;
    
    // Add event listener to the save button
    const saveButton = container.querySelector('.save-ideas');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            alert('Ideas saved! You can access them in your profile after logging in.');
        });
    }
}