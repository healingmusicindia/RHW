function initializeSolutionsSection() {
    // Add click event listeners to all "Learn More" buttons in solution cards
    document.querySelectorAll('.solution-card .btn-outline').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the solution title
            const solutionTitle = this.parentElement.querySelector('h3').textContent;
            
            // Show solution details in a modal
            showSolutionModal(solutionTitle);
        });
    });
}

function showSolutionModal(solutionTitle) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('solution-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'solution-modal';
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
        modalTitle.id = 'modal-title';
        
        const modalBody = document.createElement('div');
        modalBody.id = 'modal-body';
        
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalBody);
        modal.appendChild(modalContent);
        
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Update modal content based on solution
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = solutionTitle;
    modalBody.innerHTML = getSolutionDetails(solutionTitle);
    
    // Show modal
    modal.style.display = 'block';
}

function getSolutionDetails(solutionTitle) {
    // Return details based on solution
    const solutionDetails = {
        "Rooftop Collection": `
            <div class="solution-detail">
                <img src="images/rooftop-detail.jpg" alt="Rooftop Collection System">
                <h3>How Rooftop Collection Works</h3>
                <p>Rooftop rainwater harvesting is one of the most common and effective methods to collect rainwater. The system uses your roof as a catchment area, with gutters and downspouts directing water to storage tanks.</p>
                
                <h4>Components:</h4>
                <ul>
                    <li><strong>Catchment Surface:</strong> Your roof serves as the collection area</li>
                    <li><strong>Gutters & Downspouts:</strong> Channel water from the roof</li>
                    <li><strong>First Flush Diverter:</strong> Removes initial dirty water</li>
                    <li><strong>Filters:</strong> Removes debris and contaminants</li>
                    <li><strong>Storage Tank:</strong> Stores collected rainwater</li>
                    <li><strong>Pump (optional):</strong> Distributes water for use</li>
                </ul>
                
                <h4>Benefits:</h4>
                <ul>
                    <li>Reduces water bills by up to 40%</li>
                    <li>Provides water during shortages</li>
                    <li>Reduces stormwater runoff</li>
                    <li>Low maintenance requirements</li>
                    <li>Can be retrofitted to existing buildings</li>
                </ul>
                
                <h4>Installation Cost:</h4>
                <p>Basic systems start at $500, while comprehensive systems can range from $2,000 to $8,000 depending on size and features.</p>
                
                <div class="cta-buttons">
                    <a href="#" class="btn btn-primary">Get Installation Guide</a>
                    <a href="#" class="btn btn-secondary">Find Installers</a>
                </div>
            </div>
        `,
        "Percolation Pits": `
            <div class="solution-detail">
                <img src="images/percolation-detail.jpg" alt="Percolation Pit Diagram">
                <h3>Understanding Percolation Pits</h3>
                <p>Percolation pits are excavated pits filled with gravel and sand that allow rainwater to slowly seep into the soil, recharging groundwater levels and improving soil moisture.</p>
                
                <h4>How It Works:</h4>
                <ul>
                    <li>Rainwater is directed to the pit through pipes or channels</li>
                    <li>Water percolates through layers of gravel, sand, and soil</li>
                    <li>Natural filtration occurs as water moves through different layers</li>
                    <li>Groundwater is recharged, raising the water table</li>
                </ul>
                
                <h4>Ideal Locations:</h4>
                <ul>
                    <li>Areas with permeable soil</li>
                    <li>Properties with open space</li>
                    <li>Regions with declining groundwater levels</li>
                    <li>Areas prone to water scarcity</li>
                </ul>
                
                <h4>Construction Steps:</h4>
                <ol>
                    <li>Dig a pit (typically 1-3m wide and 2-3m deep)</li>
                    <li>Line the pit with geotextile fabric (optional)</li>
                    <li>Fill with layers of gravel, coarse sand, and pebbles</li>
                    <li>Cover with a perforated cover to prevent debris entry</li>
                </ol>
                
                <h4>Maintenance:</h4>
                <p>Clean the inlet and outlet pipes seasonally and remove accumulated silt every 3-5 years.</p>
                
                <div class="cta-buttons">
                    <a href="#" class="btn btn-primary">Download Construction Guide</a>
                    <a href="#" class="btn btn-secondary">Calculate Pit Size</a>
                </div>
            </div>
        `,
        "Rain Gardens": `
            <div class="solution-detail">
                <img src="images/rain-garden-detail.jpg" alt="Rain Garden Example">
                <h3>Creating Beautiful Rain Gardens</h3>
                <p>Rain gardens are shallow depressions planted with native vegetation that capture and filter rainwater runoff from roofs, driveways, and other hard surfaces, allowing it to slowly infiltrate into the soil.</p>
                
                <h4>Benefits:</h4>
                <ul>
                    <li>Reduces stormwater runoff by 30-40%</li>
                    <li>Filters pollutants from water</li>
                    <li>Creates habitat for birds and beneficial insects</li>
                    <li>Adds beauty and value to your property</li>
                    <li>Low maintenance once established</li>
                </ul>
                
                <h4>Plant Selection:</h4>
                <p>Choose native plants that can tolerate both wet and dry conditions. Consider a mix of:</p>
                <ul>
                    <li>Deep-rooted native grasses</li>
                    <li>Flowering perennials</li>
                    <li>Small shrubs</li>
                    <li>Water-loving sedges and rushes</li>
                </ul>
                
                <h4>Design Tips:</h4>
                <ul>
                    <li>Locate at least 10 feet from building foundations</li>
                    <li>Size the garden to approximately 20-30% of the drainage area</li>
                    <li>Create a depression 4-8 inches deep</li>
                    <li>Include an overflow area for heavy rain events</li>
                    <li>Add a layer of mulch to retain moisture and prevent weeds</li>
                </ul>
                
                <div class="cta-buttons">
                    <a href="#" class="btn btn-primary">Get Design Templates</a>
                    <a href="#" class="btn btn-secondary">Find Native Plants</a>
                </div>
            </div>
        `
    };
    
    // Return the details for the requested solution or a default message
    return solutionDetails[solutionTitle] || `
        <div class="solution-detail">
            <p>Detailed information about "${solutionTitle}" will be available soon.</p>
            <p>Please check back later or contact us for more information.</p>
        </div>
    `;
}

// Add CSS for the modal
function addModalStyles() {
    if (!document.getElementById('modal-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'modal-styles';
        styleElement.textContent = `
            .modal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgba(0, 0, 0, 0.5);
                animation: fadeIn 0.3s;
            }
            
            .modal-content {
                background-color: #fff;
                margin: 5% auto;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
                width: 80%;
                max-width: 800px;
                position: relative;
                animation: slideIn 0.4s;
            }
            
            .close {
                position: absolute;
                right: 20px;
                top: 15px;
                color: #aaa;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
                transition: 0.3s;
            }
            
            .close:hover {
                color: #333;
            }
            
            #modal-title {
                margin-top: 0;
                color: #2196F3;
                border-bottom: 2px solid #eee;
                padding-bottom: 15px;
            }
            
            .solution-detail {
                margin-top: 20px;
            }
            
            .solution-detail img {
                width: 100%;
                max-height: 300px;
                object-fit: cover;
                border-radius: 10px;
                margin-bottom: 20px;
            }
            
            .solution-detail h3 {
                color: #333;
                margin-bottom: 15px;
            }
            
            .solution-detail h4 {
                color: #2196F3;
                margin: 20px 0 10px;
            }
            
            .solution-detail ul, .solution-detail ol {
                margin-left: 20px;
                margin-bottom: 15px;
            }
            
            .solution-detail li {
                margin-bottom: 8px;
            }
            
            .cta-buttons {
                display: flex;
                gap: 15px;
                margin-top: 30px;
            }
            
            @keyframes fadeIn {
                from {opacity: 0}
                to {opacity: 1}
            }
            
            @keyframes slideIn {
                from {transform: translateY(-50px); opacity: 0;}
                to {transform: translateY(0); opacity: 1;}
            }
        `;
        document.head.appendChild(styleElement);
    }
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    addModalStyles();
    initializeSolutionsSection();
});