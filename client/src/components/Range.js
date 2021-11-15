import React, { useEffect } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Range(props) {
    useEffect(() => {
        const rangeScore = document.getElementById("rangeScore");
        const bubbleScore = document.getElementById("bubbleScore");

        const rangeHealthScore = document.getElementById("rangeHealthScore");
        const bubbleHealthScore = document.getElementById("bubbleHealthScore");

        const setValue = () => {
            const newValue = Number(
                ((rangeScore.value - rangeScore.min) * 100) /
                (rangeScore.max - rangeScore.min)
            );
            const newPositionHeight = 8 - newValue * 0.2;

            bubbleScore.innerHTML = `<span>${rangeScore.value}/100&nbsp;Pt</span>`;
            bubbleScore.style.left = `calc(${newValue}% + (${newPositionHeight}px))`;

            const newValue2 = Number(
                ((rangeHealthScore.value - rangeHealthScore.min) * 100) /
                (rangeHealthScore.max - rangeHealthScore.min)
            );
            const newPositionWeight = 8 - newValue2 * 0.2;

            bubbleHealthScore.innerHTML = `<span>${rangeHealthScore.value}/100&nbsp;Pt</span>`;
            bubbleHealthScore.style.left = `calc(${newValue2}% + (${newPositionWeight}px))`;
        };

        document.addEventListener("DOMContentLoaded", setValue);
        rangeScore.addEventListener("input", setValue);
        rangeHealthScore.addEventListener("input", setValue);

        //Set default value of both the inputs
        document.getElementById("rangeScore").value = 0;
        document.getElementById("rangeHealthScore").value = 0;
    }, []);

    //Selected value effect for Height
    function selectedEffectHeight(e) {
        const val = (e.target.value - 0) * 1;
        e.target.style.background =
            "linear-gradient(to right, #1CC2AB 0%, #1CC2AB " +
            val +
            "%, #f0959a " +
            val +
            "%, #f0959a 100%)";
    }

    //Selected value effect for Weight
    function selectedEffectWeight(e) {
        const val = (e.target.value - 0) * 1;
        e.target.style.background =
            "linear-gradient(to right, #1CC2AB 0%, #1CC2AB " +
            val +
            "%, #f0959a " +
            val +
            "%, #f0959a 100%)";
    }

    return (
        <div className="range">
            <label className="label-input">Score</label>
            <div className="range-wrap mb-2">
                <div className="range-value" id="bubbleScore">
                    <span>{props.Score}/100&nbsp;Pt</span>
                </div>
                <input
                    type="range"
                    id="rangeScore"
                    min="0"
                    max="100"
                    onInput={selectedEffectHeight}
                    onChange={props.getScore}
                />
            </div>

            <label htmlFor="level_healthy_food" className="label-input">Health Score</label>
            <div className="range-wrap">
                <div className="range-value" id="bubbleHealthScore">
                    <span>{props.HealthScore}/100&nbsp;Pt</span>
                </div>
                <input
                    type="range"
                    id="rangeHealthScore"
                    min="0"
                    max="100"
                    onInput={selectedEffectWeight}
                    onChange={props.getHealthScore}
                />
            </div>
        </div>
    );
}

export default Range;
