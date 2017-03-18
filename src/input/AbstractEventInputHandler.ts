import { AbstractAnalyzer } from "../analyze/AbstractAnalyzer";
import { AbstractSpeaker } from "../speak/AbstractSpeaker";
import { AbstractInputHandler } from "./AbstractInputHandler";

export abstract class AbstractEventInputHandler extends AbstractInputHandler {

    public enableInput(): void {
        this.eventHandler = this.eventHandler.bind(this);
        this.window.addEventListener(this.getEventName(), <any>this.eventHandler);
    }

    public disableInput(): void {
        this.window.removeEventListener(this.getEventName(), <any>this.eventHandler);
    }

    protected handleEvent(event: UIEvent): void {
        let srcElement = <HTMLElement>event.srcElement;

        let speakText = this.getSpeakText(srcElement);
        if (speakText) {
            // since this is on-demand action, we want to abort anything prior to it
            this.outputHandler.abort();
            this.outputHandler.output(speakText);
        }
    }

    protected abstract getEventName(): string;

    protected abstract eventHandler(event: UIEvent): void;
}