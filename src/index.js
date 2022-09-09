const totalBalance = document.getElementById('b-total');
const monthBalance = document.getElementById('b-month');
const monthBalanceGrow = document.getElementById('b-month-percentage');
const graphContainer = document.getElementById('graph-wrapper');
const graphBar = document.getElementById('graph-bar-template');

addEventListener('load', load);

function load(){
    loadBalances();
    loadGraph();
}

function loadBalances(){
    const total = 921.48;
    const month = 478.33;
    const monthPercentage = 2.4;
    totalBalance.textContent = total;
    monthBalance.textContent = month;
    monthBalanceGrow.textContent = monthPercentage;
}

async function loadGraph(){
    const data = await fetch('src/data.json').then(res => res.json());
    const dateToday = new Date;
    const indexDay = dateToday.getDay();
    const fragment = document.createDocumentFragment();
    data.forEach((item,index) => {
        const bar = graphBar.content.cloneNode(true);
        const height = Math.round(32*(item['amount']/10))
        const barFill = bar.querySelector('.bar');
        barFill.style.height = `${height}px`;
        (index === indexDay-1) || (indexDay === 0 && index === 6) ? barFill.classList.replace(`bg-primary-red`,`bg-primary-cyan`) : '';
        barFill.classList.add(`hover:cursor-pointer`);
        const barAmount = bar.querySelector('.amount');
        barAmount.textContent = `$${item['amount']}`;
        const barDate = bar.querySelector('.date');
        barDate.textContent = item['day'];
        fragment.appendChild(bar); 
    });
    graphContainer.appendChild(fragment)
}



