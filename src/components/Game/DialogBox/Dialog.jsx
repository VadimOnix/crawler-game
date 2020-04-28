import React from 'react';
import classes from './Dialog.module.sass';
import { animated, Transition } from 'react-spring/renderprops-universal';

class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            phrasesCount: this.props.phrases.length,
        };
        this.handleEnterKeydown = this.handleEnterKeydown.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleEnterKeydown);



        let boxes = this.props.phrases.map(p => {
            let boxRole = p.speaker === 'hero' ? classes.hero : classes.enemy;
            let spriteSrc = this.props.speakersData.find(char => char.name === p.speaker).sprite;

            return (
                <div className = {classes.dialogBoxWrapper}>
                    <div className = {[classes.dialogBox, boxRole].join(' ')}>
                        <img className = {classes.avatar} src = {spriteSrc} alt = "" />
                        <p className = {classes.text}>
                            {p.text}
                        </p >
                    </div >
                </div >
            );
        });

        this.setState({
            boxes
        })
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleEnterKeydown);
    }

    handleEnterKeydown(e) {
        if (e.keyCode === 13) {
            if (this.state.index < this.state.phrasesCount) {
                this.setNextPhrase();
            } else {
                this.props.finishReading();
            }
        }
    }

    setNextPhrase() {
        this.setState((prevState) => ({
            index: prevState.index + 1
        }));
    }

    render() {
        // let boxes = this.props.phrases.map(p => {
        //     let boxRole = p.speaker === 'hero' ? classes.hero : classes.enemy;
        //     let spriteSrc = this.props.speakersData.find(char => char.name === p.speaker).sprite;
        //
        //     return (
        //         <div className = {classes.dialogBoxWrapper}>
        //             <div className = {[classes.dialogBox, boxRole].join(' ')}>
        //                 <img className = {classes.avatar} src = {spriteSrc} alt = "" />
        //                 <p className = {classes.text}>
        //                     {p.text}
        //                 </p >
        //             </div >
        //         </div >
        //     );
        // });
        // debugger;
        return (
            <div>
                <Transition
                    native
                    reset
                    unique = {true}
                    items = {this.state.index}
                    keys = {item => item.key}
                    from = {{transform: 'translateY: 50px'}}
                    enter = {{transform: 'translateY: 0'}}
                    leave = {{transform: 'translateY: -50px'}}
                >
                    {index => props => <div style={props}> {this.state.boxes[index]} </div>}
                </Transition >
            </div>
        );
    }
}

export default Dialog;