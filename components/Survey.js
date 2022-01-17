import {useState, useEffect} from 'react'
import * as SurveyJs from "survey-react";
import "survey-react/survey.css";

import {surveyJSON} from "../assets/js/survey-json";


// Survey Component
const Survey = (props) => {

    const [custParam, setCustParam] = useState(false);


    // Avoid rehydration conflict
    // https://nextjs.org/docs/messages/react-hydration-error
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);
    if (!hasMounted) {
        return null;
    }

	/**
	 * Handle Custom Function
	 */
	const handleClick = () => {

        // Example 3:
        setCustParam(true);
        console.log("HANDLE CLICK - CUSTOM PARAM: ", custParam)
    };


    /**
	 * afterRenderQuestionHandler
	 */
	const afterRenderQuestionHandler = function (survey, options) {

        // Example 2:
        //setCustParam(!custParam);
        console.log("AFTER RENDER QUESTION - CUSTOM PARAM: " , custParam)

        const tarea = document.querySelector('.sv_q_other');
		if ( tarea ) {
        
			tarea.onclick = function(){ 
                handleClick(); 
            }
            
		}

	}


    let mySurvey = new SurveyJs.Model(surveyJSON);
    mySurvey.showCompletedPage = true;

    // Example 1:
    //setCustParam(true);
    console.log("BEFORE RENDER SURVEY - CUSTOM PARAM: " , custParam)

    return (
        <SurveyJs.Survey
            model={mySurvey}
            onAfterRenderQuestion={afterRenderQuestionHandler}
        />
    );
}

export default Survey;
