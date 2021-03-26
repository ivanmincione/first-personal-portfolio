const options = {
  cutoutPercentage: 65,
  animation: {
      duration: 5000,
    easing: 'linear',
  },
  animateScale: true,
  tooltips: {
    enabled: false
  },
  events: []
};

const skills = [
  {
    id: "html_css",
    values: [95, 5]
  },
  {
    id: "javascript",
    values: [85, 15]
  },
  {
    id: "vue",
    values: [80, 20]
  },
  {
    id: "laravel",
    values: [75, 25]
  },
  {
    id: "php",
    values: [75, 25]
  },
  {
    id: "mysql",
    values: [70, 30]
  },
  {
    id: "ui-ux",
    values: [90, 10]
  },
  {
    id: "others",
    values: [80, 20]
  },
];

let offset = 0;

for (const skill of skills) {
  const canvas = document.querySelector(`#${skill.id}`);
  if (!canvas) { continue; }

  const ctx = canvas.getContext('2d');

  setTimeout(() => {
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: skill.values,
          backgroundColor: [
            '#2d99ae',
            '#c5c6c7',
          ]
        }]
      },
      options: options
    });
  }, offset);

  offset += 250;
}
