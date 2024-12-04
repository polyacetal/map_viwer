package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// MapData 構造体
type MapData struct {
	Name          string     `json:"Name"`
	RemainingTime int        `json:"RemainingTime"`
	Size          [2]int     `json:"Size"`
	Data          [][]int    `json:"Data"`
	C             Coordinate `json:"C"`
	H             Coordinate `json:"H"`
}

// Coordinate 構造体
type Coordinate struct {
	X int `json:"X"`
	Y int `json:"Y"`
}

// App 構造体 (アプリケーションロジックをまとめる)
type App struct{}

// NewApp App構造体のインスタンスを返す
func NewApp() *App {
	return &App{}
}

// GetMapData ファイルを読み込み、MapData構造体を返す関数
func (a *App) GetMapData(filePath string) (*MapData, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, fmt.Errorf("ファイルを開けません: %w", err)
	}
	defer file.Close()

	var mapData MapData
	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		line := scanner.Text()
		if strings.HasPrefix(line, "N:") {
			mapData.Name = strings.TrimPrefix(line, "N:")
		} else if strings.HasPrefix(line, "T:") {
			mapData.RemainingTime, _ = strconv.Atoi(strings.TrimPrefix(line, "T:"))
		} else if strings.HasPrefix(line, "S:") {
			sizeData := strings.TrimPrefix(line, "S:")
			sizes := strings.Split(sizeData, ",")
			mapData.Size[0], _ = strconv.Atoi(sizes[0])
			mapData.Size[1], _ = strconv.Atoi(sizes[1])
		} else if strings.HasPrefix(line, "D:") {
			dataLine := strings.TrimPrefix(line, "D:")
			values := strings.Split(dataLine, ",")
			row := []int{}
			for _, val := range values {
				num, _ := strconv.Atoi(val)
				row = append(row, num)
			}
			mapData.Data = append(mapData.Data, row)
		} else if strings.HasPrefix(line, "C:") {
			coordData := strings.TrimPrefix(line, "C:")
			coords := strings.Split(coordData, ",")
			mapData.C.X, _ = strconv.Atoi(coords[0])
			mapData.C.Y, _ = strconv.Atoi(coords[1])
		} else if strings.HasPrefix(line, "H:") {
			coordData := strings.TrimPrefix(line, "H:")
			coords := strings.Split(coordData, ",")
			mapData.H.X, _ = strconv.Atoi(coords[0])
			mapData.H.Y, _ = strconv.Atoi(coords[1])
		}
	}

	if err := scanner.Err(); err != nil {
		return nil, fmt.Errorf("スキャン中にエラーが発生しました: %w", err)
	}

	return &mapData, nil
}
