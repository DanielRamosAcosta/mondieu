import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject'

import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/skip'
import 'rxjs/add/operator/retryWhen'
import 'rxjs/add/operator/takeUntil'

import { CONNECT, DISCONNECT, RECEIVE_MESSAGE, SEND_MESSAGE } from 'modules/websocket'

const socket = WebSocketSubject.create(`ws://${window.location.hostname}:9090`);

const chatListenerEpic = action$ =>
  action$.ofType(CONNECT)
    .mergeMap(action => socket
      .retryWhen(
        err => window.navigator.onLine ?
          Observable.timer(1000) :
          Observable.fromEvent(window, 'online')
      )
      .takeUntil(action$.ofType(DISCONNECT))
      .map(payload => ({type: RECEIVE_MESSAGE, payload}))
    )

const chatSenderEpic = action$ =>
  action$.ofType(SEND_MESSAGE)
    .map(action => action.payload)
    .map(({method, params}) => ({
      id: method,
      jsonrpc: '2.0',
      method,
      params
    }))
    .map(JSON.stringify)
    .map(msg => socket.next(msg))
    .skip()

export default combineEpics(
  chatListenerEpic,
  chatSenderEpic
)
