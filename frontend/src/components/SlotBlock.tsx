type Props = {
    symbol: string;
}

const SlotBlock = ({symbol}: Props) => {
    return (
        <div style={{margin: 20}}>{symbol}</div>
    )
}

export default SlotBlock
