/**
 * Created by dinhquangtrung on 11/1/15.
 */

import './index.html';
import React from 'react';
import ReactDOM from 'react-dom';
import ApiClient from './helpers/ApiClient';

const client = new ApiClient();
const dest = document.getElementById('root');
client.get('/hello').then((res) => console.log(res));

ReactDOM.render(<div>Hello</div>, dest);
