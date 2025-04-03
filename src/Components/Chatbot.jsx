import React, { useState } from "react";
import "../Styles/Chatbot.css";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false); // State to toggle chatbot visibility

    const getBotResponse = (userMessage) => {
        const lowerMessage = userMessage.toLowerCase();

        if (lowerMessage.includes("stress")) {
            return `
                <p>Stress can be managed by practicing deep breathing, meditation, regular exercise, and maintaining a healthy sleep schedule. 
                Talking to a trusted friend or professional can also help.</p>
                <ul>
                    <li>Identify the Cause – Understand what’s triggering your stress and work on solutions.</li>
                    <li>Practice Deep Breathing – Try slow, deep breaths to calm your mind.</li>
                    <li>Exercise Regularly – Physical activity helps reduce stress hormones.</li>
                    <li>Take Breaks – Short breaks can refresh your mind.</li>
                </ul>
                <a href="https://www.healthline.com/nutrition/16-ways-relieve-stress" target="_blank" rel="noopener noreferrer">Stress Management</a>
            `;
        } else if (lowerMessage.includes("suicidal") || lowerMessage.includes("suicide") || lowerMessage.includes("giving up")) {
            return `
                <p>I'm really sorry you're feeling this way. You are not alone, and support is available. 
                Please consider reaching out to a mental health professional or a trusted person in your life.</p>
                <ul>
                    <li>Talk to someone you trust – A friend, family member, or mentor can provide support.</li>
                    <li>Reach out to a professional – A therapist or counselor can help you navigate your feelings.</li>
                    <li>Call a helpline – Many countries have 24/7 crisis helplines where trained professionals can support you.</li>
                </ul>
                <a href="https://findahelpline.com/" target="_blank" rel="noopener noreferrer">Find a Helpline</a>
            `;
        } else if (lowerMessage.includes("anxiety")) {
            return `
                <p>Anxiety can be overwhelming, but there are ways to manage it. Try deep breathing, mindfulness, or engaging in activities that relax you. 
                Talking to someone about your feelings can also help.</p>
                <ul>
                    <li>Take slow, deep breaths – Inhale for 4 seconds, hold for 4 seconds, and exhale for 4 seconds.</li>
                    <li>Stay present – Focus on the "now" instead of worrying about the future.</li>
                    <li>Write down your thoughts – Journaling can help clear your mind.</li>
                    <li>Engage in relaxation techniques – Listening to calming music or walking in nature can help.</li>
                </ul>
                <a href="https://www.verywellmind.com/tips-to-reduce-anxiety-5087461" target="_blank" rel="noopener noreferrer">Anxiety Management</a>
            `;
        } else if (lowerMessage.includes("depression")) {
            return `
                <p>I'm sorry you're feeling this way. You are not alone, and support is available. Small steps like staying active, maintaining a routine, and talking to someone can help.</p>
                <ul>
                    <li>Stay connected – Talk to friends, family, or a counselor.</li>
                    <li>Engage in enjoyable activities – Even small hobbies can boost your mood.</li>
                    <li>Prioritize sleep – A good sleep schedule improves mental health.</li>
                    <li>Consider professional help – Therapists can provide guidance and support.</li>
                </ul>
                <a href="https://www.helpguide.org/articles/depression/coping-with-depression.htm" target="_blank" rel="noopener noreferrer">Coping with Depression</a>
            `;
        } else if (lowerMessage.includes("panic attack")) {
            return `
                <p>Panic attacks can be overwhelming, but they are temporary. Try grounding techniques and slow breathing to calm yourself.</p>
                <ul>
                    <li>5-4-3-2-1 Technique – Identify 5 things you see, 4 things you touch, 3 things you hear, 2 things you smell, and 1 thing you taste.</li>
                    <li>Deep breathing – Inhale deeply through your nose, hold for a few seconds, and exhale slowly.</li>
                    <li>Reassure yourself – Remind yourself that the attack will pass.</li>
                </ul>
                <a href="https://www.healthline.com/health/how-to-stop-a-panic-attack" target="_blank" rel="noopener noreferrer">How to Stop a Panic Attack</a>
            `;
        } else if (lowerMessage.includes("insomnia") || lowerMessage.includes("can't sleep") || lowerMessage.includes("sleep")) {
            return `
                <p>Having trouble sleeping? Try improving your sleep routine with these tips.</p>
                <ul>
                    <li>Avoid screens before bed – The blue light affects melatonin production.</li>
                    <li>Stick to a schedule – Go to bed and wake up at the same time daily.</li>
                    <li>Relax before bedtime – Try reading, meditating, or listening to calming music.</li>
                    <li>Avoid caffeine late in the day – It can disrupt sleep.</li>
                </ul>
                <a href="https://www.sleepfoundation.org/insomnia" target="_blank" rel="noopener noreferrer">Sleep Tips</a>
            `;
        } else if (lowerMessage.includes("self-confidence") || lowerMessage.includes("low self-esteem")) {
            return `
                <p>Building confidence takes time, but small steps can make a big difference.</p>
                <ul>
                    <li>Practice positive self-talk – Remind yourself of your strengths.</li>
                    <li>Set small goals – Achieving them will boost your confidence.</li>
                    <li>Step out of your comfort zone – Trying new things helps you grow.</li>
                    <li>Surround yourself with supportive people – Encouraging friends uplift you.</li>
                </ul>
                <a href="https://www.psychologytoday.com/us/basics/self-esteem" target="_blank" rel="noopener noreferrer">Building Confidence</a>
            `;
        } else if (lowerMessage.includes("lonely") || lowerMessage.includes("loneliness")) {
            return `
                <p>Feeling lonely can be tough, but you're not alone. Here are some ways to cope.</p>
                <ul>
                    <li>Stay connected – Reach out to friends and family.</li>
                    <li>Engage in activities – Join a club, take a class, or volunteer.</li>
                    <li>Focus on self-care – Treat yourself with kindness and patience.</li>
                    <li>Consider therapy – Talking to a professional can provide guidance.</li>
                </ul>
                <a href="https://www.verywellmind.com/how-to-deal-with-loneliness-4842329" target="_blank" rel="noopener noreferrer">Dealing with Loneliness</a>
            `;
        } else if (lowerMessage.includes("focus") || lowerMessage.includes("avoid distraction")) {
            return `
                <p>Improving focus requires discipline and smart strategies. Try the following:</p>
                <ul>
                    <li>Eliminate Distractions – Keep your phone away and create a quiet study space.</li>
                    <li>Use the Pomodoro Technique – Study for 25 minutes, then take a 5-minute break.</li>
                    <li>Set Clear Goals – Write down what you need to accomplish.</li>
                    <li>Practice Mindfulness – Train your mind to stay in the present moment.</li>
                    <li>Get Enough Sleep – Lack of sleep reduces concentration levels.</li>
                </ul>
                <a href="https://www.health.harvard.edu/mind-and-mood/how-to-improve-your-concentration" target="_blank" rel="noopener noreferrer">Improve Focus</a>
            `;
        } else if (lowerMessage.includes("happy") || lowerMessage.includes("healthy life") || lowerMessage.includes("happiness")) {
            return `
                <p>Living a happy and healthy life requires balance and positive habits. Here’s how:</p>
                <ul>
                    <li>Exercise Regularly – Boosts mood and energy.</li>
                    <li>Eat Nutritious Food – A healthy diet supports mental well-being.</li>
                    <li>Practice Gratitude – Focus on the good things in life.</li>
                    <li>Avoid Negative Influences – Surround yourself with positive people.</li>
                    <li>Engage in Hobbies – Doing what you love keeps your mind active.</li>
                </ul>
                <a href="https://www.verywellmind.com/ways-to-live-a-happier-life-4179396" target="_blank" rel="noopener noreferrer">Tips for a Happy Life</a>
            `;
        } else if (lowerMessage.includes("make friends") || lowerMessage.includes("socialize") || lowerMessage.includes("isolated")) {
            return `
                <p>Building friendships takes effort but is rewarding. Try these steps:</p>
                <ul>
                    <li>Join Social Groups – Attend community events or hobby clubs.</li>
                    <li>Start Small – Begin with casual conversations.</li>
                    <li>Be a Good Listener – Show interest in what others say.</li>
                    <li>Step Out of Your Comfort Zone – Try new social activities.</li>
                    <li>Stay Open-Minded – Be accepting of different personalities.</li>
                </ul>
                <a href="https://www.psychologytoday.com/us/blog/friendship-20/202007/how-make-friends-according-science" target="_blank" rel="noopener noreferrer">How to Make Friends</a>
            `;
        } else if (lowerMessage.includes("overthinking")) {
            return `
                <p>Overthinking can drain your energy. Here’s how to stop it:</p>
                <ul>
                    <li>Challenge negative thoughts – Ask yourself, "Is this really true?"</li>
                    <li>Focus on what you can control.</li>
                    <li>Engage in activities like reading, art, or exercise.</li>
                    <li>Write down your thoughts and analyze them.</li>
                </ul>
            `;
        } else if (lowerMessage.includes("self-esteem") || lowerMessage.includes("confidence")) {
            return `
                <p>Building confidence takes time, but here are some steps to help:</p>
                <ul>
                    <li>Practice self-affirmations – "I am capable and strong."</li>
                    <li>Celebrate small achievements – Every step counts.</li>
                    <li>Step out of your comfort zone – Try new experiences.</li>
                    <li>Surround yourself with positive and supportive people.</li>
                </ul>
            `;
        } else if (lowerMessage.includes("negative thoughts")) {
            return `
                <p>Negative thoughts can be managed with a shift in mindset.</p>
                <ul>
                    <li>Replace negative thoughts with positive ones.</li>
                    <li>Practice gratitude – List three things you are thankful for daily.</li>
                    <li>Avoid negative influences – Social media can sometimes increase negativity.</li>
                    <li>Engage in hobbies that make you happy.</li>
                </ul>
            `;
        } else if (lowerMessage.includes("meditation") || lowerMessage.includes("how to meditate")) {
            return `
                <p>Meditation is a powerful tool for reducing stress, improving focus, and enhancing emotional well-being.</p>
                <h4>🌿 Benefits of Meditation:</h4>
                <ul>
                    <li>Reduces stress and anxiety.</li>
                    <li>Improves focus and concentration.</li>
                    <li>Enhances emotional resilience and self-awareness.</li>
                    <li>Promotes better sleep and relaxation.</li>
                </ul>
                <h4>🧘‍♂️ How to Meditate:</h4>
                <ul>
                    <li>Find a quiet place and sit comfortably.</li>
                    <li>Close your eyes and take slow, deep breaths.</li>
                    <li>Focus on your breath – Inhale deeply, exhale slowly.</li>
                    <li>If your mind wanders, gently bring it back to your breath.</li>
                    <li>Start with 5 minutes daily and gradually increase.</li>
                </ul>
                <a href="https://www.headspace.com/meditation/techniques" target="_blank" rel="noopener noreferrer">Learn More About Meditation</a>
            `;
        } else {
            return "Hi there! I'm here to listen. Could you tell me more about how I can help you?";
        }
    };

    const handleSendMessage = () => {
        if (input.trim() === "") return;

        const userMessage = { text: input, sender: "user" };
        setMessages([...messages, userMessage]);

        setTimeout(() => {
            const botReply = { text: getBotResponse(input), sender: "bot" };
            setMessages((prev) => [...prev, botReply]);
        }, 1000);

        setInput("");
    };

    return (
        <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
            {/* Toggle Button */}
            <div className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
                💬
            </div>

            {/* Chatbox */}
            {isOpen && (
                <div className="chatbox">
                    <div className="chatbox-header">
                        <span>AI Chatbot</span>
                        
                    </div>

                    {/* Messages */}
                    <div className="chatbox-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={msg.sender === "user" ? "user-message" : "bot-message"}>
                                {msg.sender === "bot" ? (
                                    <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                                ) : (
                                    msg.text
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Input Section */}
                    <div className="chatbox-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        /></div>
                        <div className="chatbox-input">
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
