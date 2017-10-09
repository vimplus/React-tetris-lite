import React, { Component } from 'react';
import Grid, { Tile, Tetris, buildMatrix } from './Grid';
// import AI from './Ai';
import './style.scss';

function random(rows, cols) {
    let data = buildmatrix(rows, cols);

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; i++) {
            data[i][j] = new Tile();
        }
    }
    return data;
}

class Game extends Component {
    constructor(props) {
        super(props)
        this.rows = props.rows || 20;
        this.cols = props.cols || 15;
        this.state = {
            total: 0,
            score: 0,
            data: buildMatrix(this.rows, this.cols, null)
        }

        this.timerInput = null;
        this.intervalInput = 500;

        this.enableKeyboard = true;
        this.useAI = props.aiSeed != null;
        this.intervalAI = props.aiInterval || 200;
        let aiSeed = props.aiSeed || {
            alpha:0.14454541761156853,
            beta:-0.06266904571086948,
            gama:-0.13412844849297312,
            delta:-0.025127285656600856
        }

        // this.ai = new AI(aiSeed.alpha, aiSeed.beta, aiSeed.gama, aiSeed.delta);
        if(props.aiSeed) this.ai.seed = props.aiSeed;

        this.aiActions = [];
        this.status = 0;  // 0: pause, 1: running, -1: game over
    }
    setPreviewPosition(tetris) {
        tetris.setPos(
            (this.refs.preview.props.rows - tetris.height()) >> 1,
            (this.refs.preview.props.cols - tetris.width()) >> 1
        );
        return tetris;
    }
    setNewTetrisPosition(tetris) {
        tetris.setPos(0, (this.refs.main.props.cols - tetris.width()) >> 1);
        return tetris;
    }
    render(){
        return  (
            <div className="tetris">
                <Grid rows={this.rows} cols={this.cols} ref="main"/>
                <section>
                    <Grid rows={5} cols={5} ref="preview" />
                    <section>
                        <table>
                            <caption></caption>
                            <tbody>
                                <tr>
                                    <td>Total</td><td>{this.state.total}</td>
                                </tr>
                                <tr>
                                    <td>Score</td><td>{this.state.score}</td>
                                </tr>
                                <tr>
                                    <td><input type="radio" disabled={this.props.disableMode} checked={!this.useAI} value="false" onChange={(e)=>{e.target.blur();this.automation(e.target.value==="true")}} />人工控制</td><td><input type="radio" disabled={this.props.disableMode} value="true" checked={this.useAI}  onChange={(e)=>{e.target.blur();this.automation(e.target.value==="true")}} />AI控制</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    <section className="links">
                        <ul>
                            <li className={window.location.pathname.endsWith("/")||window.location.pathname.endsWith("/index.html")?"selected":""}><a href="index.html">Tetris</a></li>
                            <li className={window.location.pathname.endsWith("/test.html")?"selected":""}><a href="test.html">单元测试</a></li>
                            <li className={window.location.pathname.endsWith("/evolution.html")?"selected":""}><a href="evolution.html">AI训练</a></li>
                        </ul>
                    </section>
                    <section>
                        <p>操作说明:空格键加速，方向键左、右控制平移动，上下键控制变形</p>
                        <p>训练模式下不能切换操作模式，全程AI控制</p>
                        <p>Github地址: <a href="https://github.com/hoyt-tian/tetirs" target="_blank">https://github.com/hoyt-tian/tetirs</a></p>
                        <p>更多说明: <a href="http://www.hoyt-tian.com/tag/tetris/" target="_blank">http://www.hoyt-tian.com/tag/tetris</a></p>
                    </section>
                </section>
            </div>
        );
    }
}

export default Game;
