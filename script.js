const cities = [
  { name: "Delhi", aqi: 310, color: "#1abc9c" },
  { name: "Mumbai", aqi: 120, color: "#2ecc71" },
  { name: "Bangalore", aqi: 80, color: "#3498db" },
  { name: "Kolkata", aqi: 160, color: "#9b59b6" },
  { name: "Chennai", aqi: 90, color: "#34495e" },
  { name: "Hyderabad", aqi: 110, color: "#f1c40f" },
  { name: "Jaipur", aqi: 200, color: "#e67e22" },
  { name: "Lucknow", aqi: 250, color: "#e74c3c" },
  { name: "Ahmedabad", aqi: 130, color: "#95a5a6" },
  { name: "Pune", aqi: 70, color: "#16a085" },
  { name: "Patna", aqi: 300, color: "#27ae60" },
  { name: "Surat", aqi: 140, color: "#2980b9" },
  { name: "Nagpur", aqi: 100, color: "#8e44ad" },
  { name: "Bhopal", aqi: 85, color: "#2c3e50" },
  { name: "Visakhapatnam", aqi: 115, color: "#d35400" }
];

let allCities = cities;

function getAQIStatus(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 200) return "Unhealthy (Sensitive)";
  if (aqi <= 300) return "Unhealthy";
  return "Very Unhealthy";
}

function renderCards(cityList) {
  const container = document.getElementById("dashboard");
  container.innerHTML = "";
  cityList.forEach(city => {
    const status = getAQIStatus(city.aqi);
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="city">🏙️ ${city.name}</div>
      <div class="aqi" style="color:${city.color}">${city.aqi}</div>
      <div class="level" style="background:${city.color}">${status}</div>
    `;
    container.appendChild(card);
  });
}

function filterCities() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const filtered = allCities.filter(city => city.name.toLowerCase().includes(search));
  renderCards(filtered);
  updateChart(filtered);
}

const ctx = document.getElementById('aqiChart').getContext('2d');

let aqiChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Air Quality Index (AQI)',
      data: [],
      borderRadius: 10,
      backgroundColor: [],
      borderSkipped: false
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#2c3e50',
        titleColor: '#fff',
        bodyColor: '#ecf0f1',
        borderColor: '#34495e',
        borderWidth: 1,
      },
      title: {
        display: true,
        text: 'Live AQI of Indian Cities',
        font: {
          size: 18,
          weight: 'bold'
        },
        padding: { top: 10, bottom: 30 }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#2c3e50',
          font: { weight: 'bold' }
        },
        grid: { display: false }
      },
      y: {
        beginAtZero: true,
        suggestedMax: 400,
        ticks: { color: '#2c3e50' },
        grid: { color: '#ecf0f1' }
      }
    }
  }
});

function updateChart(cityList) {
  aqiChart.data.labels = cityList.map(c => c.name);
  aqiChart.data.datasets[0].data = cityList.map(c => c.aqi);
  aqiChart.data.datasets[0].backgroundColor = cityList.map(c => c.color);
  aqiChart.update();
}

renderCards(allCities);
updateChart(allCities);

// 🌙 Theme toggle logic with localStorage
const toggleBtn = document.getElementById("toggleTheme");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  toggleBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Load saved theme
window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️ Light Mode";
  }
};
