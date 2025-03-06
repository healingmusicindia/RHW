document.addEventListener('DOMContentLoaded', function() {
    // Initialize location finder functionality
    initializeLocationFinder();
});

function initializeLocationFinder() {
    const locationInput = document.getElementById('location-input');
    const findLocationBtn = document.getElementById('find-location');
    const useGpsBtn = document.getElementById('use-gps');
    
    if (findLocationBtn) {
        findLocationBtn.addEventListener('click', function() {
            const location = locationInput.value.trim();
            if (location) {
                fetchLocationData(location);
            } else {
                showNotification('Please enter a location', 'error');
            }
        });
    }
    
    if (useGpsBtn) {
        useGpsBtn.addEventListener('click', function() {
            if (navigator.geolocation) {
                // Show loading state
                useGpsBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Locating...';
                useGpsBtn.disabled = true;
                
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        reverseGeocode(lat, lon);
                    },
                    function(error) {
                        useGpsBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i> Use GPS';
                        useGpsBtn.disabled = false;
                        showNotification(getGeolocationErrorMessage(error), 'error');
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0
                    }
                );
            } else {
                showNotification('Geolocation is not supported by your browser', 'error');
            }
        });
    }
}

function reverseGeocode(lat, lon) {
    // In a real application, you would use a geocoding service API like Google Maps, OpenCage, etc.
    // For this example, we'll use the free Nominatim API (OpenStreetMap)
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`;
    
    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'RainSaver App' // Required by Nominatim's usage policy
        }
    })
    .then(response => response.json())
    .then(data => {
        // Reset the button
        const useGpsBtn = document.getElementById('use-gps');
        useGpsBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i> Use GPS';
        useGpsBtn.disabled = false;
        
        // Extract city or town from the response
        let location = '';
        if (data.address) {
            location = data.address.city || data.address.town || data.address.village || data.address.county || '';
        }
        
        if (location) {
            document.getElementById('location-input').value = location;
            showNotification(`Location found: ${location}`, 'success');
            fetchLocationData(location);
        } else {
            showNotification('Could not determine your location name', 'error');
        }
    })
    .catch(error => {
        const useGpsBtn = document.getElementById('use-gps');
        useGpsBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i> Use GPS';
        useGpsBtn.disabled = false;
        showNotification('Error getting location: ' + error.message, 'error');
    });
}

function fetchLocationData(location) {
    // Show loading state
    showLoadingState(true);
    
    // In a real application, this would be an API call to your backend
    // For demo purposes, we'll simulate a response after a delay
    setTimeout(() => {
        // Simulate rainfall data
        const rainfallData = generateSampleRainfallData();
        updateRainfallChart(rainfallData);
        updateRainfallInsights(location, rainfallData);
        
        // Generate AI recommendations
        generateAIRecommendation(location, rainfallData);
        
        // Hide loading state
        showLoadingState(false);
        
        // Show success message
        showNotification(`Data loaded for ${location}`, 'success');
        
        // Scroll to rainfall data section
        document.getElementById('data').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1500);
}

function getGeolocationErrorMessage(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            return "Location access denied. Please enable location services.";
        case error.POSITION_UNAVAILABLE:
            return "Location information is unavailable.";
        case error.TIMEOUT:
            return "Location request timed out.";
        case error.UNKNOWN_ERROR:
            return "An unknown error occurred while getting location.";
        default:
            return "Error getting location.";
    }
}

function showLoadingState(isLoading) {
    const elements = [
        document.getElementById('rainfall-chart'),
        document.getElementById('annual-rainfall-value'),
        document.getElementById('rainy-season-value'),
        document.getElementById('harvesting-potential')
    ];
    
    elements.forEach(element => {
        if (element) {
            if (isLoading) {
                element.classList.add('loading');
                if (element.id !== 'rainfall-chart') {
                    element.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                }
            } else {
                element.classList.remove('loading');
            }
        }
    });
}

function showNotification(message, type) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'notification';
        
        const content = document.createElement('div');
        content.className = 'notification-content';
        
        const icon = document.createElement('i');
        icon.className = 'notification-icon';
        
        const text = document.createElement('span');
        text.className = 'notification-message';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'notification-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
        });
        
        content.appendChild(icon);
        content.appendChild(text);
        notification.appendChild(content);
        notification.appendChild(closeBtn);
        
        document.body.appendChild(notification);
    }
    
    // Update notification content
    const notificationIcon = notification.querySelector('.notification-icon');
    const notificationMessage = notification.querySelector('.notification-message');
    
    if (type === 'success') {
        notification.className = 'notification success';
        notificationIcon.className = 'notification-icon fas fa-check-circle';
    } else {
        notification.className = 'notification error';
        notificationIcon.className = 'notification-icon fas fa-exclamation-circle';
    }
    
    notificationMessage.textContent = message;
    
    // Show notification
    notification.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// These functions will be implemented in rainfall-data.js
function generateSampleRainfallData() {
    // This is a placeholder - the actual implementation will be in rainfall-data.js
    return {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        values: [45, 55, 70, 80, 90, 120, 150, 140, 100, 85, 65, 50]
    };
}

function updateRainfallChart(rainfallData) {
    // This is a placeholder - the actual implementation will be in rainfall-data.js
    console.log('Updating rainfall chart with data:', rainfallData);
}

function updateRainfallInsights(location, rainfallData) {
    // This is a placeholder - the actual implementation will be in rainfall-data.js
    console.log('Updating rainfall insights for:', location);
    
    // Simple implementation for demo purposes
    const annualRainfall = rainfallData.values.reduce((sum, val) => sum + val, 0);
    document.getElementById('annual-rainfall-value').textContent = `${annualRainfall} mm`;
    
    // Determine rainy season (months with highest rainfall)
    const highRainfallMonths = rainfallData.months.filter((_, i) => 
        rainfallData.values[i] > 100
    );
    document.getElementById('rainy-season-value').textContent = 
        highRainfallMonths.length > 0 ? 
        `${highRainfallMonths[0]} - ${highRainfallMonths[highRainfallMonths.length-1]}` : 
        'No distinct rainy season';
    
    // Calculate harvesting potential (simple formula)
    const roofArea = 100; // Assume 100 sq.m roof
    const efficiency = 0.8; // 80% collection efficiency
    const harvestPotential = Math.round(annualRainfall * roofArea * efficiency);
    document.getElementById('harvesting-potential').textContent = `${harvestPotential.toLocaleString()} liters`;
}

function generateAIRecommendation(location, rainfallData) {
    // This is a placeholder - the actual implementation will be in ai-recommendations.js
    console.log('Generating AI recommendations for:', location);
}
// Add this to your existing location-finder.js file

document.addEventListener('DOMContentLoaded', function() {
    const findLocationBtn = document.getElementById('find-location');
    const solutionPopup = document.getElementById('solution-popup');
    const closePopup = document.querySelector('.close-popup');
    const solutionResults = document.getElementById('solution-results');
    
    // Show popup when Find Solutions button is clicked
    if (findLocationBtn) {
        findLocationBtn.addEventListener('click', function() {
            const locationInput = document.getElementById('location-input').value;
            
            if (locationInput.trim() === '') {
                alert('Please enter a location');
                return;
            }
            
            // Show the popup
            solutionPopup.style.display = 'flex';
            
            // Simulate loading (replace with actual API call)
            setTimeout(function() {
                // Get solutions based on location
                const solutions = getSolutionsForLocation(locationInput);
                
                // Display results
                displaySolutionResults(solutions);
            }, 2000);
        });
    }
    
    // Close popup when X is clicked
    if (closePopup) {
        closePopup.addEventListener('click', function() {
            solutionPopup.style.display = 'none';
        });
    }
    
    // Close popup when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === solutionPopup) {
            solutionPopup.style.display = 'none';
        }
    });
    
    // Function to get solutions based on location (replace with actual implementation)
    function getSolutionsForLocation(location) {
        // This is a placeholder - in a real app, you would call an API
        // or use a database to get location-specific solutions
        return {
            recommendedSystem: 'Rooftop Collection with Underground Storage',
            potentialSavings: '120,000 liters per year',
            estimatedCost: '$1,500 - $3,000',
            paybackPeriod: '3-5 years',
            additionalRecommendations: [
                'Install a first-flush diverter to improve water quality',
                'Consider adding a UV filtration system for potable use',
                'Implement a smart monitoring system to track water levels'
            ]
        };
    }
    
    // Function to display solution results
    function displaySolutionResults(solutions) {
        // Hide the loading spinner
        document.querySelector('.loading-spinner').style.display = 'none';
        document.querySelector('.lang-analyzing-location').style.display = 'none';
        
        // Update the popup title
        document.querySelector('.lang-finding-solutions').textContent = 'Your Personalized Solution';
        
        // Create the HTML for the results
        let resultsHTML = `
            <div class="solution-item">
                <h4>Recommended System:</h4>
                <p>${solutions.recommendedSystem}</p>
            </div>
            <div class="solution-item">
                <h4>Potential Water Savings:</h4>
                <p>${solutions.potentialSavings}</p>
            </div>
            <div class="solution-item">
                <h4>Estimated Cost:</h4>
                <p>${solutions.estimatedCost}</p>
            </div>
            <div class="solution-item">
                <h4>Payback Period:</h4>
                <p>${solutions.paybackPeriod}</p>
            </div>
            <div class="solution-item">
                <h4>Additional Recommendations:</h4>
                <ul>
        `;
        
        solutions.additionalRecommendations.forEach(recommendation => {
            resultsHTML += `<li>${recommendation}</li>`;
        });
        
        resultsHTML += `
                </ul>
            </div>
            <div class="solution-actions">
                <button class="btn btn-primary">Get Detailed Report</button>
                <button class="btn btn-secondary">Contact an Expert</button>
            </div>
        `;
        
        // Add the results to the popup
        solutionResults.innerHTML = resultsHTML;
    }
});