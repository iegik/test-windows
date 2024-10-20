import { CreateService } from './common.js';

window.addEventListener('load', () => { // Why 'load' is used, not 'DOMContentLoaded' event?
    const options = { cfg: -1 };
    const comm = CreateService(options, response => {
        console.log('Response:', response);
    });
    // login as someone
    comm.showLogin('someone', 'manager');

    btnOpen.addEventListener('click', event => {
        const radio = document.querySelector('input[name="config"]:checked');
        //console.log(radio.name, radio.value);
        const cfg = +radio.value;
        const key = `cfg_${cfg}`;
        window.open(`./level1.html?cfg=${cfg}`, key);
        event.preventDefault();
    });

    btnCount.addEventListener('click', event => {
        // TODO: рассчитайте маску выбранных конфигураций, например, для комбинации
        // (Конфигурация 0 | Конфигурация 1 | Конфигурация 2) получим cfg_mask = 7 = (1 << 0 | 1 << 1 | 1 << 2)
        // Рассчитайте cfg_mask
        let cfg_mask = [...document.querySelectorAll('input[name="descend"]:checked')].reduce((prev, next) => { prev += 1 << +next.value; return prev }, 0);
        comm.countDescendants({ cfg_mask });
        event.preventDefault();
    });

    btnClose.addEventListener('click', event => {
        let cfg_mask = [...document.querySelectorAll('input[name="descend"]:checked')].reduce((prev, next) => { prev += 1 << +next.value; return prev }, 0);
        comm.closeDescendants({ cfg_mask });
        event.preventDefault();
    });

});