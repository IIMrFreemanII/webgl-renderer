import { MainSystem, PhysicsSystem, RenderSystem, WorldsManager, GameStateManager } from "engine";

export class Time {
  // time elapsed since start in seconds
  public static time = 0;
  // time between frames in seconds
  public static delta = 0;
}

export class GameLoop {
  private static requestId: number;

  public static init() {
    const { defaultWorld } = WorldsManager;

    defaultWorld.addSystem(MainSystem);
    defaultWorld.addSystem(RenderSystem);
    defaultWorld.addSystem(PhysicsSystem);

    WorldsManager.onCreate();
  }

  public static start() {
    Time.time = performance.now() * 0.001;
    GameLoop.requestId = requestAnimationFrame(GameLoop.animateLoop);
  }

  public static once() {
    if (GameStateManager.state === "stop") {
      GameLoop.requestId = requestAnimationFrame(GameLoop.animateLoop);
    }
  }

  public static stop() {
    cancelAnimationFrame(GameLoop.requestId);
  }

  public static animateLoop() {
    const timeInSeconds = performance.now() * 0.001;
    Time.delta = timeInSeconds - Time.time;
    Time.time = timeInSeconds;

    if (GameStateManager.state === "play") {
      WorldsManager.tick();
      GameLoop.requestId = requestAnimationFrame(GameLoop.animateLoop);
    } else {
      WorldsManager.editorTick();
    }
  }
}
