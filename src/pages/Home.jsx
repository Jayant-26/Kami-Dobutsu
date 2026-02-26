import { motion as Motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import audioManager from '../utils/audioManager';

function Home() {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        document.body.classList.add('no-scroll');
        document.body.classList.remove('scrollable');

        const showTimer = setTimeout(() => {
            setShowAlert(true);
        }, 1000);

        const hideTimer = setTimeout(() => {
            setShowAlert(false);
        }, 4000);

        audioManager.playBackgroundMusic();
        const enableAudio = () => {
            audioManager.enableAudio();
            setShowAlert(false);
        };

        document.addEventListener('mousemove', enableAudio, { once: true });
        document.addEventListener('click', enableAudio, { once: true });
        document.addEventListener('touchstart', enableAudio, { once: true });

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
            document.removeEventListener('mousemove', enableAudio);
            document.removeEventListener('click', enableAudio);
            document.removeEventListener('touchstart', enableAudio);
        };
    }, []);

    const handleButtonClick = () => {
        audioManager.playButtonSound();
        navigate('/questions');
    };

    return (
        <>
            {showAlert && (
                <Motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 1 }}
                    className="audio-alert"
                >
                    <p>🔊 This page has audio. Click anywhere to enable sound!</p>
                </Motion.div>
            )}

            <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-8" style={{ maxWidth: '100%', margin: '0 auto' }}>
                <Motion.div 
                    className="chinsetext" 
                    initial={{opacity:0, y: 20}}
                    animate={{opacity:1, y: 0}}
                    transition={{delay:0.5, duration:2}}
                    style={{ marginTop: '2rem' }}
                >
                    神 動 物
                </Motion.div>

                <Motion.h1
                    className="title"
                    initial={{opacity:0, y: 20}}
                    animate={{opacity:1, y: 0}}
                    transition={{delay:0.5, duration:2}}
                    style={{ marginTop: '1rem', marginBottom: '1rem' }}
                >
                    Kami Dōbutsu
                </Motion.h1>

                <Motion.p 
                    className="smalltitle" 
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{delay:1, duration:2}}
                    style={{ marginTop: '1rem', marginBottom: '1rem' }}
                >
                    Discover Your Spirit Animal!
                </Motion.p>

                <Motion.p 
                    className="question" 
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{delay:1.5, duration:2}}
                    style={{ marginTop: '1rem', marginBottom: '2rem' }}
                >
                    Answer the ancient questions. Let the ritual reveal the creature that walks beside your soul.
                </Motion.p>

                <Motion.button
                    onClick={handleButtonClick}
                    initial={{y:0}}
                    animate={{scale: [1, 1.15, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,       
                      repeatType: "loop"      
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.90 }}
                    className="ritual-button"
                    style={{ marginTop: '2rem' }}
                >
                    🌟 Enter The Rite 🌟
                </Motion.button>
            </div>
        </>
    );
}

export default Home;