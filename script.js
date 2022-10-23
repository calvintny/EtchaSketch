const container = document.querySelector('.canvas');

let flag = 0;
let row_count = 60;
let col_count = 60;
let color = '#000000';
let bgcolor = '#dddddd';


function generateGrid(){
    while(container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    } 
    
    container.addEventListener('mousedown', () => flag = 1);
    // container.addEventListener('mouseleave', () => flag = 0);
    document.addEventListener('mouseup', () => flag = 0);
    for (let i = 0; i < row_count; i++){
        const row = document.createElement('div');
        row.setAttribute('style', `display:flex; flex-wrap: wrap; flex-direction: column; flex: 1 1 ${(80/row_count) - (0.5 * (80/row_count))}%;`);
        row.classList.add('row');
        container.appendChild(row)
    }

    const rows = document.querySelectorAll('.row');
    rows.forEach((row)=>{
        for (let i = 0; i < col_count; i++){
            const div = document.createElement('div');
            div.setAttribute('style', `border: 0.1px solid #888888; height: width; flex: 1 0 ${80/col_count - (0.5* (80/row_count))}%; background-color: ${bgcolor};`);
            div.classList.add('grid');
            row.appendChild(div);
        }
    })

    const grids = document.querySelectorAll('.grid');
    grids.forEach((grid)=>(
        grid.addEventListener('mousemove', () => {
            if(flag === 1){
                grid.style.backgroundColor = color;
            }
        })
    ));

}

const colorPicker = document.querySelector('#color');
colorPicker.addEventListener('input', () => color = colorPicker.value);

const bgcolorPicker = document.querySelector('#bgcolor');
bgcolorPicker.addEventListener('input', () => {
    bgcolor = bgcolorPicker.value
    generateGrid();
});

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', resetGrid);

const slider = document.querySelector('#grid-size');
slider.addEventListener('input', () => {
    document.getElementById('grid-size-current').innerText = `${slider.value}x${slider.value}`;
    row_count = slider.value;
    col_count = slider.value;
    generateGrid();
})

function resetGrid(){
    generateGrid()
}

generateGrid();