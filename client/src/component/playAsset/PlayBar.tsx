import React from 'react'
import { AddBackground, Dice, Music, Photo, PlayBarWrap, Randompick, Vote } from './PlayBarStyle'
import dice from "../../assets/img/dice.svg"
import music from "../../assets/img/music.svg"
import photo from "../../assets/img/photo.svg"
import randompick from "../../assets/img/randompick.svg"
import vote from "../../assets/img/vote.svg"
import addBackground from "../../assets/img/addBackground.svg"

const PlayBar = () => {
    return (
        <PlayBarWrap>
            <AddBackground src={addBackground} />
            <Dice src={dice} />
            <Music src={music} />
            <Vote src={vote} />
            <Randompick src={randompick} />
            <Photo src={photo} />
        </PlayBarWrap>
    )
}

export default PlayBar