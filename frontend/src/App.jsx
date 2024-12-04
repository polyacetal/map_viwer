import React, { useEffect, useState } from "react" ;

const App = () => {
    const [mapData, setMapData] = useState({
        Name: "",
        RemainingTime: 0,
        Size: [0, 0],
        Data: [],
        Cool: { X: 0, Y: 0 },
        Hot: { X: 0, Y: 0 },
    });

    const getColor = (value) => {
        switch (value) {
            case 0:
                return "red";
            case 1:
                return "bleu";
            case 2:
                return "green";
            default:
                return "gray";
        }
    };

    const loadMap = async () => {
        try {
            const data = await window.backend.GetMapData("maps/test_map.map");
            setMapData(data);
        } catch (error) {
            console.error("データの読み込みに失敗しました:", error);
        }
    };

    useEffect(() => {
        loadMap();
    }, []);

    return (
        <div>
            <h1>マップビューア</h1>
            <div>
                {mapData.Data.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: "flex" }}>
                        {row.map((value, colIndex) => (
                            <div
                                key={colIndex}
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    margin: "2px",
                                    backgroundColor: getColor(value),
                                }}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>

            <div style={{ marginTop: "20px" }}>
                <p>マップ名: {mapData.Name}</p>
                <p>残りタイム: {mapData.RemainingTime}</p>
                <p>Cool: ({mapData.Cool.X}, {mapData.Cool.Y})</p>
                <p>Hot: ({mapData.Hot.X}, {mapData.Hot.Y})</p>
            </div>
        </div>
    );
};

export default App;