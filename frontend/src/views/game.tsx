import {useState} from "react";
import MachineButtons from "../components/MachineButtons.tsx";
import makeRequest, {methodType} from "../http/http.ts";
import {GAMEENDPOINTS} from "../types/ENDPOINTS.ts";
import SlotBlock from "../components/SlotBlock.tsx";
import {
    IGameCashOut,
    IGameData,
    IResponse,
    IRollBackendResponse,
    IStartGameBackendResponse
} from "../types/interfaces.ts";

const GamePage = () => {

    const [slots, setSlots] = useState(['X', 'X', 'X']);
    const [isSpinning, setIsSpinning] = useState(false);
    const [isGameStart, setIsGameStart] = useState(false);
    const [gameData, setGameData] = useState<IGameData>({
        created_at: "",
        credits: 0,
        id: 0,
        status: "",
        updated_at: "",
        user_id: 0
    });
    const [gameError, setGameError] = useState('');

    //Start game call
    const start = async (): Promise<void> => {
        try {
            setGameError('');
            setSlots(["X", "X", "X"]);
            const getStorageGameData: string | null = localStorage.getItem("gameData");
            if (!getStorageGameData) {
                throw new Error("No game data found for gameData");
            }
            const parsedStorageGameData = JSON.parse(getStorageGameData);
            const response: IResponse<IStartGameBackendResponse> = await makeRequest({
                method: methodType.POST,
                data: {user_id: parsedStorageGameData.id},
                url: GAMEENDPOINTS.GAME_START
            });

            if (!response.status) {
                throw new Error(response.message);
            }
            setGameData(response.data.message as IGameData);
            setIsGameStart(!isGameStart);
        } catch (error) {
            if (error instanceof Error) {
                setGameError(error.message);
            } else {
                setGameError('An unexpected error occurred');
            }
        }
    }

    //Roll call
    const roll = async (): Promise<void> => {
        try {
            setGameError('');
            setIsSpinning(true);
            setSlots(["X", "X", "X"]);
            const response: IResponse<IRollBackendResponse> = await makeRequest({
                method: methodType.POST,
                data: gameData,
                url: GAMEENDPOINTS.GAME_ROLL
            });
            if (!response.status) {
                throw new Error(response.message);
            }
            const resultSymbols = response.data.symbols; // Backend symbols
            const newCredits = response.data.credits;
            // Sequentially update each slot except the last one
            resultSymbols.forEach((symbol, index) => {
                if (index === resultSymbols.length - 1) {
                    // Immediately update the last slot
                    setSlots((prevSlots) => {
                        const updatedSlots = [...prevSlots];
                        updatedSlots[index] = symbol;
                        return updatedSlots;
                    });
                } else {
                    // Update other slots with a delay
                    setTimeout(() => {
                        setSlots((prevSlots) => {
                            const updatedSlots = [...prevSlots];
                            updatedSlots[index] = symbol;
                            return updatedSlots;
                        });
                    }, (index + 1) * 1000); // Delay by 1 second per slot
                }
            });
            //Update new credit score after all slots have been revealed
            setTimeout(() => {
                setGameData({...gameData, credits: newCredits});
                setIsSpinning(false);
            }, (resultSymbols.length - 1) * 1000);
        } catch (error) {
            if (error instanceof Error) {
                setGameError(error.message);
            } else {
                setGameError('An unexpected error occurred');
            }
        }

    }

    //Cash out and end game
    const cashOut = async (): Promise<void> => {
        try {
            const updatedGameData = {...gameData, status: 'closed'};
            setGameData(updatedGameData);
            const response: IResponse<IGameCashOut> = await makeRequest({
                method: methodType.POST,
                data: updatedGameData,
                url: GAMEENDPOINTS.GAME_CASHOUT
            });
            if (!response.status) {
                throw new Error(response.message);
            }
            setGameError(response.data.message);
            setIsGameStart(false);
        } catch (error) {
            if (error instanceof Error) {
                setGameError(error.message);
            } else {
                setGameError('An unexpected error occurred');
            }
        }
    }

    return (
        <div className={'game-page'}>
            {
                isGameStart ? (
                    <>
                        <div className="slots">
                            {slots.map((slot, index) => (
                                <SlotBlock key={index} symbol={slot}/>
                            ))}
                        </div>
                        <MachineButtons credits={gameData.credits} onRoll={roll} onCashOut={cashOut}
                                        isSpinning={isSpinning}/>

                    </>
                ) : (
                    <button onClick={start}>Start Game</button>
                )
            }
            {gameError && (
                <p className={'error'}>{gameError}</p>
            )}
        </div>
    )
}

export default GamePage;
