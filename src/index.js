import React from 'react';
import { render } from 'react-dom';
import Game from './game';

let game = render(
    <Game />,
    document.getElementById('root')
)
