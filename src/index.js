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
    countTo(0,total,10,totalBalance); 
    countTo(0,month,5,monthBalance);
    countTo(0.01,monthPercentage,0.02,monthBalanceGrow)
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
        (index === indexDay-1) || (indexDay === 0 && index === 6) ? barFill.classList.replace(`bg-primary-red`,`bg-primary-cyan`) : '';
        barFill.classList.add(`hover:cursor-pointer`);
        const barAmount = bar.querySelector('.amount');
        barAmount.textContent = `$${item['amount']}`;
        const barDate = bar.querySelector('.date');
        barDate.textContent = item['day'];
        barFill.style.height = `0px`;
        fragment.appendChild(bar); 
    });
    graphContainer.appendChild(fragment);
    document.querySelectorAll('.bar').forEach((bar,index) => {
        const height = Math.round(32*(data[index]['amount']/10))
        barTo(bar,height);
    })
}

function barTo(bar,height){
    let from = 0;
    let step = height > from ? 1 : '';
        let counter = setInterval(function(){
            from += step;
            bar.style.height = `${from}px`    

            if (from >= Math.round(height)) {
                bar.style.height = `${from}px`  
                clearInterval(counter)
            };
        },5)
}


function countTo(from,to,interval,element){
    let step = to > from ? interval : -interval;

    if(from == Math.round(to)){
        element.textContent = to;
        return
    }

    let counter = setInterval(function(){
        from += step;
        element.textContent = from.toFixed(2)

        if (from >= Math.round(to)) {
            element.textContent = to;
            clearInterval(counter)
        };
    },10)
}


