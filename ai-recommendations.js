// AI Recommendations System
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const generateBtn = document.getElementById('generate-recommendation');
    const aiResults = document.getElementById('ai-results');
    const aiLoading = document.getElementById('ai-loading');
    const locationInput = document.getElementById('location-input');
    const propertySizeInput = document.getElementById('property-size');
    const roofAreaInput = document.getElementById('roof-area');
    const waterUsageInput = document.getElementById('water-usage');
    const budgetRangeSelect = document.getElementById('budget-range');
    
    // Add event listener to generate button
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            // Validate inputs
            if (!validateInputs()) {
                return;
            }
            
            // Show loading state
            aiResults.style.display = 'block';
            aiLoading.style.display = 'block';
            document.querySelector('.recommendation-content').style.display = 'none';
            
            // Get location from the main location input
            const location = locationInput.value || 'Unknown Location';
            document.querySelector('.recommendation-location').textContent = location;
            
            // Simulate AI processing (would be replaced with actual API call)
            setTimeout(function() {
                generateAIRecommendation({
                    location: location,
                    propertySize: parseFloat(propertySizeInput.value),
                    roofArea: parseFloat(roofAreaInput.value),
                    waterUsage: parseFloat(waterUsageInput.value),
                    budget: budgetRangeSelect.value
                });
                
                // Hide loading, show results
                aiLoading.style.display = 'none';
                document.querySelector('.recommendation-content').style.display = 'block';
            }, 2000);
        });
    }
    
    // Validate form inputs
    function validateInputs() {
        let isValid = true;
        
        if (!locationInput.value) {
            alert('Please enter your location first');
            locationInput.focus();
            isValid = false;
        } else if (!propertySizeInput.value || propertySizeInput.value < 10) {
            alert('Please enter a valid property size (minimum 10 sq. meters)');
            propertySizeInput.focus();
            isValid = false;
        } else if (!roofAreaInput.value || roofAreaInput.value < 10) {
            alert('Please enter a valid roof area (minimum 10 sq. meters)');
            roofAreaInput.focus();
            isValid = false;
        } else if (!waterUsageInput.value || waterUsageInput.value < 100) {
            alert('Please enter a valid monthly water usage (minimum 100 liters)');
            waterUsageInput.focus();
            isValid = false;
        }
        
        return isValid;
    }
    
    // Generate AI recommendation based on inputs
    function generateAIRecommendation(data) {
        // Calculate potential rainwater harvesting
        const avgRainfallPerYear = getEstimatedRainfall(data.location);
        const potentialCollection = data.roofArea * avgRainfallPerYear * 0.8; // 80% efficiency
        
        // Calculate water savings
        const annualWaterUsage = data.waterUsage * 12;
        const waterSavingsPercent = Math.min(100, Math.round((potentialCollection / annualWaterUsage) * 100));
        
        // Calculate cost savings
        const waterCostPerLiter = 0.03; // Average cost in rupees
        const annualSavings = potentialCollection * waterCostPerLiter;
        
        // Update the UI with the results
        document.querySelector('.water-saved').textContent = `${Math.round(potentialCollection).toLocaleString()} liters per year (${waterSavingsPercent}% of your usage)`;
        document.querySelector('.cost-saved').textContent = `₹${Math.round(annualSavings).toLocaleString()} per year`;
        document.querySelector('.eco-impact').textContent = `${Math.round(potentialCollection / 1000)} m³ water conserved`;
        
        // Generate recommended system based on inputs
        const recommendedSystem = getRecommendedSystem(data, potentialCollection);
        
        // Update recommendation details
        const detailsContainer = document.querySelector('.recommendation-details');
        detailsContainer.innerHTML = `
            <div class="system-recommendation">
                <h5>Recommended System</h5>
                <p>${recommendedSystem.name}</p>
                <p class="system-description">${recommendedSystem.description}</p>
            </div>
            <div class="components-list">
                <h5>Components</h5>
                <ul>
                    ${recommendedSystem.components.map(comp => `<li>${comp}</li>`).join('')}
                </ul>
            </div>
            <div class="estimated-cost">
                <h5>Estimated Cost</h5>
                <p>₹${recommendedSystem.cost.toLocaleString()}</p>
                <p class="roi">Return on Investment: ${recommendedSystem.roi} years</p>
            </div>
        `;
        
        // Add event listeners for action buttons
        setupActionButtons(data, recommendedSystem);
    }
    
    // Get estimated rainfall based on location (would be replaced with actual API data)
    function getEstimatedRainfall(location) {
        // This is a simplified example - in a real app, you would use an API
        const locationLower = location.toLowerCase();
        
        if (locationLower.includes('mumbai') || locationLower.includes('kerala') || locationLower.includes('goa')) {
            return 2500; // mm per year
        } else if (locationLower.includes('delhi') || locationLower.includes('jaipur') || locationLower.includes('ahmedabad')) {
            return 600; // mm per year
        } else if (locationLower.includes('bangalore') || locationLower.includes('hyderabad')) {
            return 900; // mm per year
        } else if (locationLower.includes('chennai') || locationLower.includes('kolkata')) {
            return 1400; // mm per year
        } else {
            return 1100; // Default average for India
        }
    }
    
    // Get recommended system based on user inputs and potential collection
    function getRecommendedSystem(data, potentialCollection) {
        const systems = {
            low: {
                small: {
                    name: "Basic Rooftop Collection System",
                    description: "A simple and cost-effective system for collecting rainwater from your roof for garden use and basic needs.",
                    components: [
                        "Roof gutters and downspouts",
                        "First-flush diverter",
                        "Basic filtration system",
                        "500-1000 liter storage tank"
                    ],
                    cost: 8000,
                    roi: "2-3"
                },
                medium: {
                    name: "Standard Rooftop Collection System",
                    description: "An efficient system for collecting and storing rainwater for multiple household uses.",
                    components: [
                        "Roof gutters and downspouts",
                        "First-flush diverter",
                        "Basic filtration system",
                        "1000-2000 liter storage tank"
                    ],
                    cost: 12000,
                    roi: "2-3"
                },
                large: {
                    name: "Extended Rooftop Collection System",
                    description: "A comprehensive system for collecting significant amounts of rainwater for various household uses.",
                    components: [
                        "Roof gutters and downspouts",
                        "First-flush diverter",
                        "Multi-stage filtration",
                        "2000-3000 liter storage tank"
                    ],
                    cost: 15000,
                    roi: "2-3"
                }
            },
            medium: {
                small: {
                    name: "Advanced Rooftop Harvesting System",
                    description: "A high-quality system with improved filtration for collecting and using rainwater for most household needs.",
                    components: [
                        "Seamless gutters and downspouts",
                        "First-flush diverter with automatic cleaning",
                        "Multi-stage filtration system",
                        "2000-3000 liter storage tank",
                        "Basic pump system"
                    ],
                    cost: 25000,
                    roi: "3-4"
                },
                medium: {
                    name: "Comprehensive Harvesting System",
                    description: "A complete system for collecting, filtering, and distributing rainwater throughout your property.",
                    components: [
                        "Seamless gutters and downspouts",
                        "First-flush diverter with automatic cleaning",
                        "Advanced filtration system",
                        "3000-5000 liter storage tank",
                        "Pump and basic distribution system"
                    ],
                    cost: 35000,
                    roi: "3-5"
                },
                large: {
                    name: "Premium Harvesting System",
                    description: "A high-capacity system for maximizing rainwater collection and usage throughout your property.",
                    components: [
                        "Seamless gutters and downspouts",
                        "First-flush diverter with automatic cleaning",
                        "Advanced filtration system",
                        "5000-10000 liter storage tank",
                        "Pump and distribution system"
                    ],
                    cost: 45000,
                    roi: "4-5"
                }
            },
            high: {
                small: {
                    name: "Smart Harvesting System",
                    description: "An intelligent system with monitoring and automation for optimal rainwater harvesting and usage.",
                    components: [
                        "Premium gutters and downspouts",
                        "Automated first-flush system",
                        "Multi-stage filtration with UV treatment",
                        "5000-10000 liter storage tank",
                        "Smart pump and distribution system",
                        "Water quality monitoring"
                    ],
                    cost: 60000,
                    roi: "5-6"
                },
                medium: {
                    name: "Integrated Water Management System",
                    description: "A comprehensive solution that integrates rainwater harvesting with overall water management for your property.",
                    components: [
                        "Premium gutters and downspouts",
                        "Automated first-flush system",
                        "Advanced filtration with UV and ozone treatment",
                        "10000-15000 liter storage tank",
                        "Smart pump and distribution system",
                        "Water quality monitoring",
                        "Groundwater recharge system"
                    ],
                    cost: 85000,
                    roi: "6-7"
                },
                large: {
                    name: "Complete Water Autonomy System",
                    description: "A state-of-the-art system designed to maximize water self-sufficiency through advanced rainwater harvesting.",
                    components: [
                        "Premium gutters and downspouts",
                        "Automated first-flush system",
                        "Advanced filtration with UV and ozone treatment",
                        "15000+ liter storage tank",
                        "Smart pump and comprehensive distribution system",
                        "Real-time water quality monitoring",
                        "Groundwater recharge system",
                        "Greywater recycling integration"
                    ],
                    cost: 120000,
                    roi: "7-8"
                }
            }
        };
        
        // Determine system size based on roof area
        let size;
        if (data.roofArea < 100) {
            size = "small";
        } else if (data.roofArea < 200) {
            size = "medium";
        } else {
            size = "large";
        }
        
        return systems[data.budget][size];
    }
    
    // Setup action buttons
    function setupActionButtons(data, recommendedSystem) {
        const downloadBtn = document.querySelector('.download-pdf');
        const shareBtn = document.querySelector('.share-recommendation');
        
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function() {
                alert('Generating PDF report... This feature will be available soon!');
            });
        }
        
        if (shareBtn) {
            shareBtn.addEventListener('click', function() {
                const shareText = `I just got a