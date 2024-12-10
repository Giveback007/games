import { elms, setFilterItem, state, updateGame } from "../store";
import { debounceTimeOut, wait } from "./util";

// -- GAMEPAD -- //
const btns = {
    Start: 'start',
    Select: 'select',

    Down: 'button13',
    Left: 'button14',
    Up: 'button12',
    Right: 'button15',

    B: 'button0',
    A: 'button1',
    Y: 'button2',
    X: 'button3',

    L1: 'l1',
    L2: 'l2',
    R1: 'r1',
    R2: 'r2',

    Power: 'power',
}

const gameCtrlBtns = [
    "button0", "button1", "button2", "button3", "button4",
    "button5", "button6", "button7", "button8", "button9",
    "button10", "button11", "button12", "button13", "button14",
    "button15", "button16",

    "up", "down", "right", "left",

    "up0", "down0", "right0", "left0",
    "up1", "down1", "right1", "left1",

    "l1", "l2", "r1", "r2",

    "start", "select", "power",
]

export const initGameControl = () => gameControl.on('connect', async (gp: any) => {
    const keyMap = new Map<str, AnyFnc>(Object.entries({
        ...gameCtrlBtns.reduce((obj, btn) => ({ ...obj, [btn]: () => log(btn) }), {}),

        [btns.Power]: () => {
            const { game } = elms.get()
            if (!game) return;

            updateGame(game, { isFav: !game.isFav })
        },

        [btns.L1]: () => {
            setFilterItem('favs', !state.get().filters.favs)
        },

        [btns.B]: () => {
            const { game } = elms.get();
            if (!game) return;

            window.open(`https://www.xbox.com/en-US/play/games/${game.xboxId}`, "_blank");
        },

        [btns.Up]: () => {
            const s = state.get();
            const pr = elms.get().data[s.hglIdx];
            if (!pr) return;

            let i = s.hglIdx;
            let x: {
                el: Element; y: num; x: num; idx: number;
            } | null = null;
            while (!x && i > -1) {
                x = elms.get().data[--i] || null;
                if (x && (x.y >= pr.y || x.x !== pr.x)) x = null
            }

            if (x) {
                state.upd(s => ({ ...s, hglIdx: i }));
                window.scrollTo({ top: x.y - 100, behavior: 'smooth' });
            }
        },
        [btns.Down]: () => {
            const s = state.get();
            const pr = elms.get().data[s.hglIdx];
            if (!pr) return;

            let i = s.hglIdx;
            let x: {
                el: Element; y: num; x: num; idx: number;
            } | null = null;
            while (!x && i < elms.get().data.length) {
                const a = elms.get().data[++i] || null;
                if (a && a.y > pr.y && a.x === pr.x) x = a;
            }

            if (x) {
                state.upd(s => ({ ...s, hglIdx: i }));
                window.scrollTo({ top: x.y - 100, behavior: 'smooth' });
            }
        },
        [btns.Right]: () => {
            const s = state.get();
            let idx = s.hglIdx + 1;
            if (s.filteredLength - 1 < idx) idx = s.filteredLength - 1;

            state.upd(s => ({ ...s, hglIdx: idx }));

            const x = elms.get().data[idx];
            if (x) window.scrollTo({ top: x.y - 100, behavior: 'smooth' });
        },
        [btns.Left]: () => {
            const s = state.get();
            let idx = s.hglIdx - 1;
            if (idx < 0) idx = 0;

            state.upd(s => ({ ...s, hglIdx: idx }));

            const x = elms.get().data[idx];
            if (x) window.scrollTo({ top: x.y - 100, behavior: 'smooth' })
        },
    }));

    for (const [gpBtn, fct] of keyMap) {
        const debounce = debounceTimeOut();
        let time: num | null = null;
        let isPressing = false;
        let isHolding = false;

        const btnHolding = async () => {
            if (isHolding) return;
            isHolding = true;
            while (isHolding) {
                fct();
                await wait(100)
            }
        }

        gp.on(gpBtn, () => {
            debounce(() => {
                isPressing = false;
                isHolding = false;
                time = null;
            }, 75);

            if (time && time + 300 < Date.now()) {
                btnHolding()
            } else if (!time) {
                time = Date.now();
            }

            if (isPressing) return;

            isPressing = true;
            fct();
        }, 50);
    }
})