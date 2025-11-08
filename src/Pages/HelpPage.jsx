import { Header } from "../components/Header";
import './HelpPage.css';


export function HelpPage() {
    return (
        <>
            <div className="help-body">
                <Header />
                <div className="help-title">
                    <h1 className="help-h1">
                        <span className="help-h1-simpledotart">
                            <span className="help-h1-text-simple">
                                Simple
                            </span>
                            DotArt
                        </span>
                        <span className="help-h1-notukaikata">
                            の使い方
                        </span>
                    </h1>
                </div>
            </div>
        </>
    );
}