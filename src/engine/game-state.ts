import EventEmitter from "eventemitter3";

export type GameState = "play" | "stop";
type EventTypes = "stateChange";

export class GameStateManager {
  private static emitter = new EventEmitter();
  public static state: GameState = "stop";

  public static setState(state: GameState) {
    this.state = state;
    this.emitter.emit("stateChange", state);
  }

  public static addListener(event: EventTypes, callback: (state: GameState) => void) {
    this.emitter.addListener(event, callback);
  }

  public static removeListener(event: EventTypes, callback: (state: GameState) => void) {
    this.emitter.removeListener(event, callback);
  }
}
