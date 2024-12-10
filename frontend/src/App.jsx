import React, { useEffect, useState } from "react";
import { GetMapData, GetMapList } from '../wailsjs/go/main/App';
import Floor from './assets/images/Floor.png';
import Item from './assets/images/Item.png';
import Block from './assets/images/Block.png';
import Cool from './assets/images/Cool.png';
import Hot from './assets/images/Hot.png';
import html2canvas from "html2canvas"; // キャプチャ用ライブラリ

const App = () => {
	const [mapList, setMapList] = useState([]);	// マップ一覧
	const [selectedMap, setSelectedMap] = useState(null);	//選択されたマップ
	const [mapData, setMapData] = useState(null);	// マップデータ
	const [isMenuOpen, setIsMenuOpen] = useState(false);	// ハンバーガーメニューの状態

	// 画像マッピング
	const imageMapping = {
		0: Floor,
		1: Cool,
		2: Block,
		3: Item,
		4: Cool,
		5: Hot,
	}

	// 初回レンダリング時にマップ一覧を取得
	useEffect(() => {
		const loadMapList = async () => {
			try{
				const list = await GetMapList("maps/");
				setMapList(list);
			} catch (error) {
				console.error("マップ一覧の取得に失敗しました:", error);
			}
		};
    loadMapList();
  }, []);

	// マップデータを読み込む
	const loadMapData = async (mapFile) => {
		try {
			const data = await GetMapData(`maps/${mapFile}`);
			setSelectedMap(mapFile);
			setMapData(data);
		} catch (error) {
			console.error("データの読み込みに失敗しました:", error);
		}
	};

	// メニューのトグル
	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	const savaMapAsImage = async () => {
		try {
			const mapElement = document.getElementById("map-container");
			const canvas = await html2canvas(mapElement);	// マップ部分をキャプチャ
			const link = document.createElement("a");
			link.download = `${selectedMap || "map"}.png`;
			link.href = canvas.toDataURL("image/png");
			link.click();
		} catch (error) {
			console.error("マップ画像の保存に失敗しました:", error);
		}
	};

	return (
		<div style={{ padding: "20px" }}>
		{/* ハンバーガーメニュー*/}
		<button onClick={toggleMenu} style={{ marginBottom: "20px" }}>
			{isMenuOpen ? "閉じる" : "マップ一覧"}
		</button>
		{isMenuOpen && (
			<div
				style={{
					position: "absolute",
					top: "50px",
					left: "0",
					backgroundColor: "#fff",
					border: "1px solid #ccc",
					zIndex: 1000,
					width: "200px",
				}}
			>
				<ul style={{ listStyle: "none", padding: "10px"}}>
				{mapList.map((mapFile) => (
					<li
						key={mapFile}
						style={{
							padding: "5px",
							cursor: "pointer",
							color: "#000",
							backgroundColor: selectedMap === mapFile ? "#ddd" : "#fff",
					}}
					onClick={() => {
						loadMapData(mapFile);
						setIsMenuOpen(false);	// メニューを閉じる
					}}
					>
						{mapFile}
					</li>
				))}
				</ul>
			</div>
		)}

		{/*マップ表示*/}
		{mapData ? (
			<div>
				<h1>{mapData.Name}</h1>
				<p>残り時間: {mapData.Time}</p>
				<p>
					マップサイズ: {mapData.Size.Rows} x {mapData.Size.Cols}
				</p>
				<div id="map-container">
					{mapData.Data.map((row, rowIndex) => (
						<div key={rowIndex} style={{ display: "flex", marginCottom: "2px" }}>
							{row.map((value, colIndex) => (
								<div key={colIndex}>
									<img
										src={imageMapping[value] || "images/default.png"}	// 画像マッピング
										alt={`Cell ${value}`}
										style={{ width: "50px", height: "50px" }}
									/>
								</div>
							))}
						</div>
					))}
				</div>
				<div style={{ marginTop: "20px" }}>
				</div>
			</div>
		) : (
			<p>マップを選択して下さい.</p>
		)}
		</div>
	);
};

export default App;
