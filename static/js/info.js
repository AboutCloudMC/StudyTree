document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const icon = themeToggleBtn.querySelector('i');
    const themeToggleText = document.getElementById('theme-toggle-text');
    const body = document.body;
    const contentContainer = document.getElementById('content-container');
    const downloadPdfBtn = document.getElementById('download-pdf-btn');

    // Check local storage for the current theme
    let currentTheme = localStorage.getItem('theme') || 'light';

    // Apply the current theme from localStorage
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        contentContainer.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
        themeToggleText.textContent = 'Light Mode';
    } else {
        themeToggleText.textContent = 'Dark Mode';
    }

    // Event listener for the theme toggle button
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        contentContainer.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            themeToggleText.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            themeToggleText.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    });

    // Ensure jsPDF and html2canvas are loaded before executing
    async function loadLibraries() {
        if (!window.html2canvas) {
            await new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
                script.onload = resolve;
                document.body.appendChild(script);
            });
        }

        if (!window.jspdf) {
            await new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
                script.onload = resolve;
                document.body.appendChild(script);
            });
        }
    }

    // Event listener for the "Download PDF" button
    downloadPdfBtn.addEventListener('click', async () => {
        await loadLibraries(); // Ensure libraries are loaded

        const { jsPDF } = window.jspdf;

        // Temporarily expand content to capture everything
        contentContainer.style.height = 'auto';
        contentContainer.style.maxHeight = 'none';

        html2canvas(contentContainer, {
            scale: 3, // High-quality output
            useCORS: true // Ensures external images load properly
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            if (imgHeight > 297) {
                let position = 0;
                const pageHeight = 297; // A4 page height in mm

                while (position < imgHeight) {
                    pdf.addImage(imgData, 'PNG', 0, position * -1, imgWidth, imgHeight);
                    position += pageHeight;
                    if (position < imgHeight) pdf.addPage();
                }
            } else {
                pdf.addImage(imgData, 'PNG', 0, 10, imgWidth, imgHeight);
            }

            pdf.save('infodocument.pdf');

            // Reset the content size
            contentContainer.style.height = '';
            contentContainer.style.maxHeight = '';
        });
    });
});
