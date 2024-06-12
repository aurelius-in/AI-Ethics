document.addEventListener('DOMContentLoaded', () => {
    const checklistForm = document.getElementById('checklist-form');
    const checklistItems = document.getElementById('checklist-items');
    const auditTrail = document.getElementById('audit-trail');

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

        if (report.length > 0) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>Checked Items:</strong> ${report.join(', ')} - <em>${new Date().toLocaleString()}</em>`;
            auditTrail.appendChild(listItem);
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

    window.searchAuditTrail = function() {
        const query = document.getElementById('search-audit').value.toLowerCase();
        const items = auditTrail.getElementsByTagName('li');
        
        Array.from(items).forEach((item) => {
            if (item.innerText.toLowerCase().includes(query)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    };

    window.exportAuditTrail = function(format) {
        const content = Array.from(auditTrail.children).map(item => item.innerText).join('\n');
        
        if (format === 'pdf') {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            doc.text(content, 10, 10);
            doc.save('audit_trail.pdf');
        } else if (format === 'text') {
            const blob = new Blob([content], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'audit
