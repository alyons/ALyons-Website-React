import React from 'react';

export default class HomePage extends React.Component {
    render() {
        return (
            <div className="home">
                <h2>Welcome to the site!</h2>
                <p>
                    If you made it here looking for Alexander Lyons, Atlanta-based software engineer and programmer, you found me.
                </p>
                <div class="one-third column">
                    <h3>Lume Personal Tracker</h3>
                    <p>Role(s): Software Engineer</p>
                    <p>I am currently developing <a href="http://lumeapp.co/" target="_blank">Lume Personal Tracker</a> while working at Magnimbus LLC. The app is being built using Objective-C and formerly developed using Xamarin (formerly Monotouch).</p>
                </div>
                <div class="one-third column">
                    <h3>AI Shell</h3>
                    <p>Role(s): Software Engineer</p>
                    <p>The <a href="https://github.com/alyons/AI-Shell--C--" target="_blank">AI Shell</a> is something I crafted partially working on a few projects from school, which crystallized while working on Lume. We use this to test data against goals users set within Lume. I am also looking to use it in other porjects in the future.</p>
                </div>
                <div class="one-third column">
                    <h3>Automated Build and Testing</h3>
                    <p>Role(s): Author</p>
                    <p>This is a <a href="AutomatedBuildAndTesting.pdf">paper</a> I wrote for a software engineering course based around process and process improvement. While we have not been able to implement the automated build and testing for Lume, we are always looking to improve our process in any way we can.</p>
                </div>
            </div>
        );
    }
}