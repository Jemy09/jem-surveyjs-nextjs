import {useState, useEffect} from 'react'
import * as SurveyJs from "survey-react";
import "survey-react/survey.css";

import {surveyJSON} from "../assets/js/survey-json";


// Survey Component
const Survey = (props) => {

    const [custParam, setCustParam] = useState(false);


    // Avoid rehydration conflict
    // https://nextjs.org/docs/messages/react-hydration-error
    const [hasMounted, setHasMounted]   = useState(false);
    const [mySurvey, setMySurvey]       = useState({});

    useEffect(() => {
        setHasMounted(true);
        setMySurvey( new SurveyJs.Model(surveyJSON) );


    }, []);
    if (!hasMounted) {
        return null;
    }

	/**
	 * Handle Custom Function
	 */
	const handleClick = () => {

        // Example 3:
        setCustParam(!custParam);
        console.log("HANDLE CLICK - CUSTOM PARAM: ", custParam)
    };

    function onCompleteComponent( survey ) {
		let resTxt = '';
	
		// prepare and send results to MongoDB
		if ( Object.keys(survey.data).length ) {
			let res = survey.data;
			Object.keys(res).forEach( function(idx, itm) {
				if ( Array.isArray(res[idx]) ) {
					resTxt += '<strong>' + idx + ":</strong> " + res[idx].join() + "<br>"; 
				}
				else if (typeof res[idx] === 'string' || res[idx] instanceof String) {
					resTxt += '<strong>' + idx + ":</strong> " + res[idx] + "<br>"; 
				}
			});

			// render the text above
			document
			.querySelector('#surveyResult')
			.innerHTML = resTxt;

		}
		//console.log("RESULT: " , resTxt)
	}

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


    mySurvey.showCompletedPage = true;

    // Example 1:
    //setCustParam(true);
    console.log("BEFORE RENDER SURVEY - CUSTOM PARAM: " , custParam)

    return (
        <SurveyJs.Survey
            model={mySurvey}
            onAfterRenderQuestion={afterRenderQuestionHandler}
			onComplete={onCompleteComponent}
        />
    );
}

export default Survey;
