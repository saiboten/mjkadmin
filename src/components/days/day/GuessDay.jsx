import { Block, Inline } from 'jsxstyle';

import React from 'react';
import GuessAction from '../../../actions/GuessAction';
import DayAction from '../../../actions/DayAction';
import GuessStore from '../../../stores/GuessStore';
import SongAudio from './SongAudio';

var GuessDay = React.createClass({

    componentDidMount() {
        GuessStore.listen(this.guessChanged);
    },

    componentWillUnmount() {
        GuessStore.unlisten(this.guessChanged);
    },

    getInitialState() {
        return {
            guess: "",
            guessResponse: GuessStore.getState()
        }
    },

    guessChanged() {
        this.setState({
            guessResponse: GuessStore.getState()
        });
    },

    submit(e) {
        e.preventDefault();
        console.log("Submit!", this.state.guess);
        GuessAction.guess(this.state.guess);
    },

    handleChange: function(event) {
        this.setState({guess: event.target.value});
    },

    getDescription(description) {
        return {
            __html: description
        }
    },

    render() {

        console.log("Props: ", this.props);

        var answerThisDay = undefined;
        if(this.props.answers) {
            answerThisDay = this.props.answers.find(function(el) {
                return el.correctSongAnswer && el.day === this.props.today;
            },this);
        }

        console.log("Answer this day: ", answerThisDay);

        var formOrFeedback = "";

        if(answerThisDay && answerThisDay.correctSongAnswer) {
            formOrFeedback = (<p>Du har allerede svart rett på denne oppgaven! Svaret
                var: {answerThisDay.guessedSong} </p>);
        }
        else if(this.state.guessResponse.guess && this.state.guessResponse.guess.correct) {
          formOrFeedback = (<p>Gratulerer, det var rett!</p>);
        }
        else {
            formOrFeedback = (
                <form onSubmit={this.submit}>
                    <div>
                        <input className="guess-form__input" placeholder="Sang" onChange={this.handleChange} value={this.state.guess.guess}/>
                        <Inline margin="10px" width="10%"><button className="guess-form__submitbutton" type="submit">Gjett!</button></Inline>
                    </div>
                    <p>{this.state.guessResponse.guess ? this.state.guessResponse.guess.feedback : ""}  </p>

                </form>
            );
        }

        return (
            <span>
                <p dangerouslySetInnerHTML={this.getDescription(this.props.day.description)}></p>
                <SongAudio link={this.props.day.link} />

                {this.props.user ? formOrFeedback : (<div><input className="guess-form__input" disabled="true" placeholder="Sang" /><p>Logg inn for å besvare (se menyen)</p></div>)}</span>
        );
    }
});

export default GuessDay;
