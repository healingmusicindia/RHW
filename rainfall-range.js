document.addEventListener('DOMContentLoaded', function() {
    // Initialize the find location button functionality
    const findLocationBtn = document.getElementById('find-location');
    if (findLocationBtn) {
        findLocationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the location input value
            const locationInput = document.getElementById('location-input');
            const location = locationInput.value.trim();
            
            if (!location) {
                showNotification('Please enter a location first', 'error');
                return;
            }
            
            // Show the rainfall range popup
            showRainfallRangePopup(location);
        });
    }
});

function showRainfallRangePopup(location) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('rainfall-range-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'rainfall-range-modal';
        modal.className = 'modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        const modalTitle = document.createElement('h2');
        modalTitle.textContent = 'Select Your Annual Rainfall Range';
        
        const modalSubtitle = document.createElement('p');
        modalSubtitle.textContent = `Help us provide better recommendations for ${location} by selecting your annual rainfall range:`;
        
        const rangeOptions = document.createElement('div');
        rangeOptions.className = 'rainfall-range-options';
        
        // Define rainfall ranges
        const ranges = [
            { id: 'low', label: 'Low (0-500mm)', min: 0, max: 500 },
            { id: 'medium', label: 'Medium (501-1000mm)', min: 501, max: 1000 },
            { id: 'high', label: 'High (1001-1500mm)', min: 1001, max: 1500 },
            { id: 'very-high', label: 'Very High (1500mm+)', min: 1501, max: 5000 }
        ];
        
        // Create range option buttons
        ranges.forEach(range => {
            const rangeBtn = document.createElement('button');
            rangeBtn.className = 'btn rainfall-range-btn';
            rangeBtn.textContent = range.label;
            rangeBtn.dataset.min = range.min;
            rangeBtn.dataset.max = range.max;
            rangeBtn.addEventListener('click', function() {
                // Process the selected range
                processRainfallRange(location, range.min, range.max);
                modal.style.display = 'none';
            });
            
            rangeOptions.appendChild(rangeBtn);
        });
        
        // Add custom range input
        const customRangeDiv = document.createElement('div');
        customRangeDiv.className = 'custom-range';
        
        const customRangeLabel = document.createElement('label');
        customRangeLabel.textContent = 'Or enter exact annual rainfall (mm):';
        
        const customRangeInput = document.createElement('input');
        customRangeInput.type = 'number';
        customRangeInput.id = 'custom-rainfall';
        customRangeInput.min = '0';
        customRangeInput.placeholder = 'e.g., 750';
        
        const customRangeBtn = document.createElement('button');
        customRangeBtn.className = 'btn btn-primary';
        customRangeBtn.textContent = 'Submit';
        customRangeBtn.addEventListener('click', function() {
            const customValue = parseInt(document.getElementById('custom-rainfall').value);
            if (isNaN(customValue) || customValue < 0) {
                showNotification('Please enter a valid rainfall amount', 'error');
                return;
            }
            
            // Process the custom range
            processRainfallRange(location, customValue, customValue);
            modal.style.display = 'none';
        });
        
        customRangeDiv.appendChild(customRangeLabel);
        customRangeDiv.appendChild(customRangeInput);
        customRangeDiv.appendChild(customRangeBtn);
        
        // Assemble the modal
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalSubtitle);
        modalContent.appendChild(rangeOptions);
        modalContent.appendChild(customRangeDiv);
        modal.appendChild(modalContent);
        
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Show the modal
    modal.style.display = 'block';
}

function processRainfallRange(location, minRainfall, maxRainfall) {
    // Show loading state
    showLoadingState(true);
    
    // Generate rainfall data based on the selected range
    const rainfallData = generateRainfallDataFromRange(minRainfall, maxRainfall);
    
    // Update the UI with the generated data
    setTimeout(() => {
        // Update rainfall chart and insights
        updateRainfallChart(rainfallData);
        updateRainfallInsights(location, rainfallData);
        
        // Generate harvesting recommendations based on rainfall range
        generateHarvestingRecommendations(location, minRainfall, maxRainfall);
        
        // Hide loading state
        showLoadingState(false);
        
        // Show success message
        showNotification(`Data loaded for ${location} with annual rainfall of ${minRainfall}-${maxRainfall}mm`, 'success');
        
        // Scroll to rainfall data section
        document.getElementById('data').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1500);
}

function generateRainfallDataFromRange(minRainfall, maxRainfall) {
    // Calculate average monthly rainfall based on the annual range
    const avgAnnualRainfall = (parseInt(minRainfall) + parseInt(maxRainfall)) / 2;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Distribution patterns based on rainfall range
    let distributionPattern;
    
    if (avgAnnualRainfall < 500) {
        // Low rainfall - concentrated in fewer months
        distributionPattern = [0.05, 0.05, 0.05, 0.1, 0.15, 0.2, 0.15, 0.1, 0.05, 0.05, 0.03, 0.02];
    } else if (avgAnnualRainfall < 1000) {
        // Medium rainfall - more evenly distributed
        distributionPattern = [0.05, 0.05, 0.08, 0.1, 0.12, 0.15, 0.15, 0.12, 0.08, 0.05, 0.03, 0.02];
    } else if (avgAnnualRainfall < 1500) {
        // High rainfall - monsoon pattern
        distributionPattern = [0.02, 0.03, 0.05, 0.08, 0.1, 0.15, 0.2, 0.18, 0.1, 0.05, 0.02, 0.02];
    } else {
        // Very high rainfall - extended rainy season
        distributionPattern = [0.05, 0.05, 0.08, 0.1, 0.12, 0.15, 0.15, 0.12, 0.08, 0.05, 0.03, 0.02];
    }
    
    // Calculate monthly values
    const values = distributionPattern.map(factor => Math.round(avgAnnualRainfall * factor));
    
    // Ensure the sum matches the average annual rainfall
    const currentSum = values.reduce((sum, val) => sum + val, 0);
    const adjustmentFactor = avgAnnualRainfall / currentSum;
    
    const adjustedValues = values.map(val => Math.round(val * adjustmentFactor));
    
    return {
        months: months,
        values: adjustedValues
    };
}

function generateHarvestingRecommendations(location, minRainfall, maxRainfall) {
    // Get the recommendation container
    const recommendationBox = document.getElementById('ai-recommendation-result');
    
    // Determine the rainfall category
    let rainfallCategory;
    const avgRainfall = (parseInt(minRainfall) + parseInt(maxRainfall)) / 2;
    
    if (avgRainfall < 500) {
        rainfallCategory = 'low';
    } else if (avgRainfall < 1000) {
        rainfallCategory = 'medium';
    } else if (avgRainfall < 1500) {
        rainfallCategory = 'high';
    } else {
        rainfallCategory = 'very-high';
    }
    
    // Generate recommendations based on rainfall category
    const recommendations = getRecommendationsByCategory(rainfallCategory, location);
    
    // Update the recommendation box
    recommendationBox.innerHTML = `
        <h3>Your Personalized Recommendation for ${location}</h3>
        <div class="recommendation-content">
            <div class="recommendation-header">
                <i class="fas fa-cloud-rain"></i>
                <div>
                    <h4>Annual Rainfall: ${minRainfall === maxRainfall ? minRainfall : minRainfall + '-' + maxRainfall} mm</h4>
                    <p>Category: ${rainfallCategory.charAt(0).toUpperCase() + rainfallCategory.slice(1)} Rainfall Region</p>
                </div>
            </div>
            
            <div class="recommendation-body">
                <h4>Recommended Harvesting Solutions:</h4>
                <ul class="recommendation-list">
                    ${recommendations.primary.map(rec => `
                        <li class="primary-recommendation">
                            <i class="fas fa-check-circle"></i>
                            <div>
                                <h5>${rec.title}</h5>
                                <p>${rec.description}</p>
                            </div>
                        </li>
                    `).join('')}
                    
                    ${recommendations.secondary.map(rec => `
                        <li class="secondary-recommendation">
                            <i class="fas fa-info-circle"></i>
                            <div>
                                <h5>${rec.title}</h5>
                                <p>${rec.description}</p>
                            </div>
                        </li>
                    `).join('')}
                </ul>
                
                <div class="recommendation-tips">
                    <h4>Additional Tips:</h4>
                    <ul>
                        ${recommendations.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="recommendation-footer">
                <button class="btn btn-primary get-detailed-plan">Get Detailed Implementation Plan</button>
                <button class="btn btn-secondary find-installers">Find Local Installers</button>
            </div>
        </div>
    `;
    
    // Add event listeners to the new buttons
    const detailedPlanBtn = recommendationBox.querySelector('.get-detailed-plan');
    const findInstallersBtn = recommendationBox.querySelector('.find-installers');
    
    if (detailedPlanBtn) {
        detailedPlanBtn.addEventListener('click', function() {
            showNotification('Your detailed implementation plan will be emailed to you shortly. Please login or register to receive it.', 'success');
        });
    }
    
    if (findInstallersBtn) {
        findInstallersBtn.addEventListener('click', function() {
            showNotification('Searching for qualified installers in ' + location + '. Please login to view the complete list.', 'success');
        });
    }
}
// Add these missing functions at the end of your file
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
        
        const text = document.createElement('p');
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

function updateRainfallChart(rainfallData) {
    const ctx = document.getElementById('rainfall-chart').getContext('2d');
    
    // Check if chart already exists and destroy it
    if (window.rainfallChart) {
        window.rainfallChart.destroy();
    }
    
    // Create new chart
    window.rainfallChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: rainfallData.months,
            datasets: [{
                label: 'Monthly Rainfall (mm)',
                data: rainfallData.values,
                backgroundColor: 'rgba(33, 150, 243, 0.7)',
                borderColor: 'rgba(33, 150, 243, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
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
}

function updateRainfallInsights(location, rainfallData) {
    // Calculate annual rainfall
    const annualRainfall = rainfallData.values.reduce((sum, val) => sum + val, 0);
    document.getElementById('annual-rainfall-value').textContent = `${annualRainfall} mm`;
    
    // Determine rainy season (months with highest rainfall)
    const highRainfallThreshold = Math.max(...rainfallData.values) * 0.7;
    const highRainfallMonths = [];
    
    rainfallData.months.forEach((month, i) => {
        if (rainfallData.values[i] >= highRainfallThreshold) {
            highRainfallMonths.push(month);
        }
    });
    
    if (highRainfallMonths.length > 0) {
        document.getElementById('rainy-season-value').textContent = 
            `${highRainfallMonths[0]} - ${highRainfallMonths[highRainfallMonths.length-1]}`;
    } else {
        document.getElementById('rainy-season-value').textContent = 'No distinct rainy season';
    }
    
    // Calculate harvesting potential (simple formula)
    const roofArea = 100; // Assume 100 sq.m roof
    const efficiency = 0.8; // 80% collection efficiency
    const harvestPotential = Math.round(annualRainfall * roofArea * efficiency);
    document.getElementById('harvesting-potential').textContent = `${harvestPotential.toLocaleString()} liters`;
}