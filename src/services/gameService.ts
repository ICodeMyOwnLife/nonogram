import Parse from 'services/parseService';
import { User } from 'parse';

export class Game extends Parse.Object {
  constructor() {
    super('Game');
  }
}

export class Level extends Parse.Object {
  constructor() {
    super('Level');
  }
}

async function loadLevel(user: User) {
  const query = new Parse.Query(Level);
  query.equalTo('user', user);
  query.descending('createdAt');
  const level = await query.first();
  return level;
}

async function saveLevel(user: User, game: Game) {
  const level = new Level();
  level.set('user', user);
  level.set('game', game);
  await level.save();
}

export async function loadGame(levelNumber?: number) {
  const user = await Parse.User.currentAsync();
  if (!user) {
    throw Error('Cannot find user');
  }

  let game: Game | undefined;
  if (typeof levelNumber === 'number') {
    game = await loadGameByLevelNumber(levelNumber);
  } else {
    const level = await loadLevel(user);
    if (level) {
      const levelGame = level.get('game') as Game;
      game = await levelGame.fetch();
    } else {
      game = await loadGameByLevelNumber(1);
    }
  }

  if (game) {
    saveLevel(user, game);
  }

  return game;
}

export async function loadGameByLevelNumber(levelNumber: number) {
  const query = new Parse.Query(Game);
  query.equalTo('level', levelNumber);
  const game = await query.first();
  return game;
}
