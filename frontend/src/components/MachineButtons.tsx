type Props = {
    credits: number;
    onRoll: () => void;
    onCashOut: () => void;
    isSpinning: boolean;
}
const MachineButtons = ({credits, onRoll, onCashOut, isSpinning}: Props) => {
    return (
        <div className="machine-buttons">
            <p>Credits: {credits}</p>
            <button onClick={onRoll} disabled={isSpinning || credits <= 0}>
                Roll
            </button>
            <button onClick={onCashOut} disabled={isSpinning || credits === 0}>
                Cash Out
            </button>
        </div>
    )
}

export default MachineButtons
