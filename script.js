    const checklistItems = document.getElementById('checklist-items');
    const complianceLog = document.getElementById('compliance-log');
    const comments = document.getElementById('comments');

    checklistForm.addEventListener('submit', (e) => {
        e.preventDefault();
        generateReport();
    });

    function generateReport() {
        const report = [];
        const checkboxes = checklistForm.querySelectorAll('input[type="checkbox"]');
        
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                report.push(checkbox.parentElement.innerText.trim());
            }
        });

        const commentsText = comments.value.trim();
        const timestamp = new Date().toLocaleString();

        if (report.length > 0) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>Checked Items:</strong> ${report.join(', ')}<br><strong>Comments:</strong> ${commentsText}<br><em>${timestamp}</em>`;
            complianceLog.appendChild(listItem);
            comments.value = '';  // Clear comments field after submission
        } else {
            alert('Please select at least one item.');
        }
    }

    window.addChecklistItem = function() {
        const newItemText = prompt("Enter the new checklist item:");
        if (newItemText) {
            const newItem = document.createElement('label');
            newItem.innerHTML = `<input type="checkbox"> ${newItemText}`;
            checklistItems.appendChild(newItem);
        }
    };

    window.searchComplianceLog = function() {
        const query = document.getElementById('search-log').value.toLowerCase();
        const items = complianceLog.getElementsByTagName('li');
        
        Array.from(items).forEach((item) => {
            if (item.innerText.toLowerCase().includes(query)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    };

    window.exportComplianceLog = function(format) {
        const content = Array.from(complianceLog.children).map(item => item.innerText.replace('Remove', '').trim()).join('\n\n');
        
        if (format === 'pdf') {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            doc.text(content, 10, 10);
            doc.save('compliance_log.pdf');
        } else if (format === 'text') {
            const blob = new Blob([content], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'compliance_log.txt';
            link.click();
        }
    };
});
