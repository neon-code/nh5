import React from 'react';
import '../CSS/primary.css';
import { Button, Image, Icon, Label, Header, Modal } from 'semantic-ui-react';

var fileDir = [
    { fileName: './50images/n01534433_128.JPEG', id: "n01534433" },
    { fileName: './50images/n01629819_138.JPEG', id: "n01629819" },
    { fileName: './50images/n01675722_7.JPEG', id: "n01675722" },
    { fileName: './50images/n01694178_12.JPEG', id: "n01694178" },
    { fileName: './50images/n01695060_334.JPEG', id: "n01695060" },
    { fileName: './50images/n01734418_356.JPEG', id: "n01734418" },
    { fileName: './50images/n01773157_76.JPEG', id: "n01773157" },
    { fileName: './50images/n01819313_83.JPEG', id: "n01819313" },
    { fileName: './50images/n01872401_16.JPEG', id: "n01872401" },
    { fileName: './50images/n01873310_70.JPEG', id: "n01873310" },
    { fileName: './50images/n02009229_44.JPEG', id: "n02009229" },
    { fileName: './50images/n02056570_63.JPEG', id: "n02056570" },
    { fileName: './50images/n02091134_2925.JPEG', id: "n02091134" },
    { fileName: './50images/n02096294_11663.JPEG', id: "n02096294" },
    { fileName: './50images/n02096437_2350.JPEG', id: "n02096437" },
    { fileName: './50images/n02107908_9.JPEG', id: "n02107908" },
    { fileName: './50images/n02113023_11608.JPEG', id: "n02113023" },
    { fileName: './50images/n02137549_237.JPEG', id: "n02137549" },
    { fileName: './50images/n02190166_160.JPEG', id: "n02190166" },
    { fileName: './50images/n02206856_71.JPEG', id: "n02206856" },
    { fileName: './50images/n02233338_55.JPEG', id: "n02233338" },
    { fileName: './50images/n02279972_40.JPEG', id: "n02279972" },
    { fileName: './50images/n02346627_75.JPEG', id: "n02346627" },
    { fileName: './50images/n02443484_27.JPEG', id: "n02443484" },
    { fileName: './50images/n02444819_228.JPEG', id: "n02444819" },
    { fileName: './50images/n02699494_153.JPEG', id: "n02699494" },
    { fileName: './50images/n02807133_467.JPEG', id: "n02807133" },
    { fileName: './50images/n02859443_141.JPEG', id: "n02859443" },
    { fileName: './50images/n02916936_136.JPEG', id: "n02916936" },
    { fileName: './50images/n02939185_150.JPEG', id: "n02939185" },
    { fileName: './50images/n03000134_113.JPEG', id: "n03000134" },
    { fileName: './50images/n03063689_24.JPEG', id: "n03063689" },
    { fileName: './50images/n03160309_959.JPEG', id: "n03160309" },
    { fileName: './50images/n03291819_187.JPEG', id: "n03291819" },
    { fileName: './50images/n03291819_659.JPEG', id: "n03291819" },
    { fileName: './50images/n03424325_236.JPEG', id: "n03424325" },
    { fileName: './50images/n03483316_955.JPEG', id: "n03483316" },
    { fileName: './50images/n03595614_447.JPEG', id: "n03595614" },
    { fileName: './50images/n03666591_1916.JPEG', id: "n03666591" },
    { fileName: './50images/n03670208_124.JPEG', id: "n03670208" },
    { fileName: './50images/n03759954_179.JPEG', id: "n03759954" },
    { fileName: './50images/n03781244_39.JPEG', id: "n03781244" },
    { fileName: './50images/n03868242_616.JPEG', id: "n03868242" },
    { fileName: './50images/n03930630_103.JPEG', id: "n03930630" },
    { fileName: './50images/n03930630_140.JPEG', id: "n03930630" },
    { fileName: './50images/n04067472_237.JPEG', id: "n04067472" },
    { fileName: './50images/n04208210_513.JPEG', id: "n04208210" },
    { fileName: './50images/n04317175_235.JPEG', id: "n04317175" },
    { fileName: './50images/n04482393_142.JPEG', id: "n04482393" },
    { fileName: './50images/n04485082_632.JPEG', id: "n04485082" },       
]

var activeIndex = Math.floor(Math.random() * 50), usedImages = [activeIndex], taskDone = 1, flag;
var timeTaken = { minutes: 0, seconds: 0, milsec: 0 }, addTime = [0, 0, 0], avgTime = [], Interval;
var fileName = fileDir[activeIndex].fileName;

export class MainImages extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isopen: false,
            activeNext: false,
            buttonText: "Next Button"
        };
    }

    componentDidMount() {
        alert("* Please disable AdBlock and any other antivirus software before you begin!\n Make sure to \"Allow\" popups/cookies on this app! *");
        this.props.onRef(this)
    }

    updateButton() {
        this.state.activeNext ? this.setState({ activeNext: false }) : this.setState({ activeNext: true })
    }

    OnFinish() {
        //To find the Average time
        let td = taskDone - 1;
        avgTime[0] = addTime[0] / td;
        avgTime[1] = addTime[1] / td;
        avgTime[2] = addTime[2] / td;

        avgTime[1] += (avgTime[0] * 60) % 60;
        avgTime[2] += (avgTime[1] * 100) % 100;

        avgTime[0] = Math.floor(avgTime[0]);
        avgTime[1] = Math.floor(avgTime[1]);
        avgTime[2] = Math.floor(avgTime[2]);

        this.props.onFinish(addTime, avgTime);
    }

    startTimer() {
        timeTaken.milsec++;

        if (timeTaken.milsec > 99) {
            timeTaken.seconds++;
            timeTaken.milsec = 0;
        }

        if (timeTaken.seconds > 59) {
            timeTaken.minutes++;
            timeTaken.seconds = 0;
        }
    }

    startWatch() {
        Interval = setInterval(this.startTimer, 10);
    }

    changeImage() {
        //Pause the StopWatch
        clearInterval(Interval);
        this.updateButton();

        //To pass values to Parent (App.js);
        let t = timeTaken.minutes + ":" + timeTaken.seconds + ":" + timeTaken.milsec;
        this.props.onNextImage(fileDir[activeIndex].fileName, fileDir[activeIndex].id, t);

        //Add the time to find total time take
        addTime[2] += timeTaken.milsec;
        if (addTime[2] > 99) {
            addTime[1] += Math.floor(addTime[2] / 100);
            addTime[2] %= 100;
        }
        addTime[1] += timeTaken.seconds;
        if (addTime[1] > 59) {
            addTime[0] += Math.floor(addTime[1] / 60);
            addTime[1] %= 60;
        }
        addTime[0] += timeTaken.minutes;
        
        //Clear the StopWatch
        timeTaken.milsec = timeTaken.seconds = timeTaken.minutes = 0;

        //Load next image
        taskDone++;
        //Change here to lock the images
        if( taskDone === 50 )
        this.setState({ buttonText: "Finish!" })

        if (taskDone > 50) {
            this.setState({
                isopen: true
            })
        }
        else
            do {
                flag = true;
                activeIndex = Math.floor(Math.random() * 50);

                for (var i = 0; i < usedImages.length; i++)
                    if (usedImages[i] === activeIndex)
                        flag = false;

                if (flag === true) {
                    usedImages.push(activeIndex);
                    fileName= fileDir[activeIndex].fileName;
                }
            } while (flag !== true);

        //Start the Watch
        this.startWatch();
    }

    render() {
        return (
            <div>
                <Image className="imageStyling" src={fileName} />

                <Label style={{ zIndex: "1", position: "fixed", top: "10px", right: '4vw' }} color="teal">
                    {taskDone}/50
                </Label>

                <div className="NextButton" style={{ width: '180px' }} >
                    {this.state.activeNext ?
                        <Button primary animated size='huge' onClick={this.changeImage.bind(this)}>
                        <Button.Content visible> {this.state.buttonText} </Button.Content>
                        <Button.Content hidden>
                            <Icon name='right arrow' />
                        </Button.Content>
                    </Button>
                    :
                    <Button disabled size='huge'>{this.state.buttonText}</Button>
                    }
                </div>

                <Modal open={this.state.isopen} basic dimmer="blurring" style={{ position: "fixed", width: "auto", marginTop: "30vh", marginLeft: "38vw" }}>
                    <Header icon='check square outline' style={{ textAlign: "center" }} content='Task Completed!' />
                    <Modal.Content>
                        <h2> Thank you for your participation! <br />
                            Please download the result. </h2>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='blue' inverted onClick={this.OnFinish.bind(this)}>
                        <Icon name='download icon' /> Download Result
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}