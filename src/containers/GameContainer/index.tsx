import React, { FC, memo, useCallback, useState } from 'react';
import classnames from 'classnames';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import GameBoard from 'components/GameBoard';
import HintRows from 'components/HintRows';
import HintCols from 'components/HintCols';
import Loading from 'components/Loading';
import Description from 'components/Description';
import SocialButtons from 'components/SocialButtons';
import useKeyPress from 'hooks/useKeyPress';
import useInterval from 'hooks/useInterval';
import config from 'config';
import {
  useGameData,
  useCellClickCallback,
  useShowResultCheatMode,
  useGetNextLevelCallback,
  useUpdateDuration,
} from './hooks';
import classes from './GameContainer.module.scss';

momentDurationFormatSetup(moment as any);

const GameContainer: FC = () => {
  const {
    startTimeRef,
    valueRows,
    resultRows,
    statusRows,
    setStatusRows,
    description,
    updateStatus,
    succeeded,
    level,
    loading,
    fetch,
    gameOver,
  } = useGameData();
  const [duration, setDuration] = useState<moment.Duration>(moment.duration());
  const handleCellClick = useCellClickCallback(updateStatus);
  const getNextLevel = useGetNextLevelCallback(fetch, level);
  const showResultCheatMode = useShowResultCheatMode();
  const rows = showResultCheatMode && resultRows ? resultRows : statusRows;
  useUpdateDuration(startTimeRef, setDuration, 1000);
  const showDescription = succeeded || gameOver;
  const descriptionMessage = gameOver
    ? 'CONGRATULATIONS!\nYou finished all levels.\nPlease head to Grab booth for a champion gift.'
    : description;
  const buttonLabel = gameOver ? undefined : 'Go to next level';

  useKeyPress(e => {
    if (e.key.toLowerCase() === 'p' && e.shiftKey) {
      setStatusRows(resultRows);
    }
  });

  return (
    <div
      className={classnames(classes.GameContainer, {
        [classes.hack]: !!showResultCheatMode,
      })}
    >
      <Loading show={loading} />

      <Description
        description={descriptionMessage}
        buttonLabel={buttonLabel}
        onOk={getNextLevel}
        isShown={showDescription}
      />

      {valueRows && rows && (
        <div className={classes.Wrapper}>
          <h1
            className={classnames(classes.Duration, {
              [classes.transparent]: succeeded,
            })}
          >
            {duration.format('hh:mm:ss', 0, { trim: false })}
          </h1>
          <h2
            className={classnames(classes.Level, {
              [classes.transparent]: succeeded,
            })}
          >
            Level: {level}
          </h2>
          <div className={classes.SocialButtons}>
            <SocialButtons href={config.FE_URL} />
          </div>
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
