document.getElementById('generate-btn').addEventListener('click', () => {
    const lottoNumbersContainer = document.getElementById('lotto-numbers');
    lottoNumbersContainer.innerHTML = ''; // 이전 번호 삭제

    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach(number => {
        const numberElement = document.createElement('div');
        numberElement.classList.add('lotto-number');
        numberElement.textContent = number;
        lottoNumbersContainer.appendChild(numberElement);
    });
});

// Theme toggle logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-mode') {
        body.classList.add('dark-mode');
        themeToggleBtn.textContent = '☀️';
    } else {
        // Default to light mode (no class needed, as :root defines light mode)
        themeToggleBtn.textContent = '🌙';
        localStorage.setItem('theme', 'light-mode'); // Ensure light-mode is saved if no theme was found
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
            themeToggleBtn.textContent = '🌙';
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            themeToggleBtn.textContent = '☀️';
        }
    });

    // Affiliate Form Submission Logic
    const affiliateForm = document.getElementById('affiliate-form');
    if (affiliateForm) {
        affiliateForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value;
            const message = document.getElementById('message').value;

            const formData = {
                name,
                email,
                company,
                message
            };

            console.log('Affiliate Inquiry Data:', formData);

            fetch('https://formspree.io/f/xbdaogwk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' // Important for Formspree to return JSON
                },
                body: JSON.stringify(formData),
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return response.json().then(errorData => Promise.reject(errorData));
            })
            .then(data => {
                console.log('Success:', data);
                alert('문의가 성공적으로 제출되었습니다. (Inquiry submitted successfully!)');
                affiliateForm.reset(); // Clear the form
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('문의 제출 중 오류가 발생했습니다. (Error submitting inquiry.)');
            });
        });
    }
});