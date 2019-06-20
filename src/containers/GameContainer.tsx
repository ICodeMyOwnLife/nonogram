import React, { FC, memo, useCallback, useState } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import GameBoard from 'components/GameBoard';
import HintRows from 'components/HintRows';
import HintCols from 'components/HintCols';
import Loading from 'components/Loading';
import Description from 'components/Description';
import useGameData from 'hooks/useGameData';
import useCheat from 'hooks/useCheat';
import classes from './GameContainer.module.scss';
import { CellInfo, CellStatus } from 'types/common';
import useInterval from 'hooks/useInterval';

momentDurationFormatSetup(moment as any);

const GameContainer: FC = () => {
  const {
    startTime,
    valueRows,
    resultRows,
    statusRows,
    description,
    updateStatus,
    succeeded,
    level,
    fetch,
    gameOver,
  } = useGameData();
  const [duration, setDuration] = useState<moment.Duration>(moment.duration());

  const handleCellClick = useCallback(
    async ({ status, rowIndex, colIndex }: CellInfo) => {
      const nextStatus: CellStatus =
        status === 'Unselected'
          ? 'Selected'
          : status === 'Selected'
          ? 'Flagged'
          : 'Unselected';

      updateStatus(rowIndex, colIndex, nextStatus);
    },
    [updateStatus],
  );

  const handleGetNextLevel = useCallback(() => {
    fetch(level);
  }, [fetch, level]);

  const toggleCheat = useCallback(
    (e: KeyboardEvent) => e.key.toLowerCase() === 'c' && e.shiftKey,
    [],
  );
  const cheatMode = useCheat(toggleCheat);
  const rows = cheatMode && resultRows ? resultRows : statusRows;

  const tick = useCallback(() => {
    debugger;
    setDuration(moment.duration(moment().diff(startTime)));
  }, [startTime]);
  useInterval(tick, 1000);

  const showDescription = succeeded || gameOver;
  const descriptionMessage = gameOver
    ? 'CONGRATULATIONS!\nYou won the game'
    : description;
  const buttonLabel = gameOver ? undefined : 'Go to next level';

  return (
    <div
      className={classnames(classes.GameContainer, {
        [classes.hack]: !!cheatMode,
      })}
    >
      <Description
        description={descriptionMessage}
        buttonLabel={buttonLabel}
        onOk={handleGetNextLevel}
        isShown={showDescription}
      />

      {!valueRows || !rows ? (
        <Loading />
      ) : (
        <div className={classes.Wrapper}>
          <h1
            className={classnames(classes.Duration, {
              [classes.transparent]: succeeded,
            })}
          >
            {duration.format()}
          </h1>

          <h2
            className={classnames(classes.Level, {
              [classes.transparent]: succeeded,
            })}
          >
            Level: {level}
          </h2>

          <div className={classes.Main}>
            <div className={classes.Game}>
              <div className={classes.TopBar}>
                <GameBoard statusRows={rows} onCellClick={handleCellClick} />
                <HintRows valueRows={valueRows} />
              </div>
              <div className={classes.BottomBar}>
                <HintCols valueRows={valueRows} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(GameContainer);
