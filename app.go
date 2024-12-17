package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"io/ioutil"
	"context"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// サイズを表す構造体
type Size struct {
	Rows int // 行数
	Cols int // 列数
}

// マップデータ構造体
type MapData struct {
	Name           string       // マップ名
	Time           int          // 残りタイム
	Size           Size         // 行数と列数
	Data           [][]int      // 2次元配列のデータ
	Cool           Coordinate   // キャラクター1の座標
	Hot            Coordinate   // キャラクター2の座標
}

// 座標を保持する構造体
type Coordinate struct {
	X, Y int
}

// App 構造体 (アプリケーションロジックをまとめる)
type App struct{
	ctx context.Context
}

// NewApp App構造体のインスタンスを返す
func NewApp() *App {
	return &App{}
}

func (a * App) domready(ctx context.Context) {
	fmt.Println("DOM が準備完了しました。アプリケーションが正常に起動しました。")
	a.ctx = ctx
}

// ファイルを読み込んでMapData構造体を生成する関数
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
			mapData.Time, _ = strconv.Atoi(strings.TrimPrefix(line, "T:"))
		} else if strings.HasPrefix(line, "S:") {
			sizeData := strings.TrimPrefix(line, "S:")
			sizes := strings.Split(sizeData, ",")
			mapData.Size.Cols, _ = strconv.Atoi(sizes[0])
			mapData.Size.Rows, _ = strconv.Atoi(sizes[1])
		} else if strings.HasPrefix(line, "D:") {
			dataLine := strings.TrimPrefix(line, "D:")
			values := strings.Split(dataLine, ",")
			row := []int{}
			for _, val := range values {
				num, err := strconv.Atoi(val)
				if err != nil {
					return nil, fmt.Errorf("数値変換に失敗: %w", err)
				}
				row = append(row, num)
			}
			mapData.Data = append(mapData.Data, row)
		} else if strings.HasPrefix(line, "C:") {
			coordData := strings.TrimPrefix(line, "C:")
			coords := strings.Split(coordData, ",")
			mapData.Cool.X, _ = strconv.Atoi(coords[0])
			mapData.Cool.Y, _ = strconv.Atoi(coords[1])
			mapData.Data[mapData.Cool.Y][mapData.Cool.X] = 4
		} else if strings.HasPrefix(line, "H:") {
			coordData := strings.TrimPrefix(line, "H:")
			coords := strings.Split(coordData, ",")
			mapData.Hot.X, _ = strconv.Atoi(coords[0])
			mapData.Hot.Y, _ = strconv.Atoi(coords[1])
			mapData.Data[mapData.Hot.Y][mapData.Hot.X] = 5
		}
	}

	if err := scanner.Err(); err != nil {
		return nil, fmt.Errorf("スキャン中にエラーが発生しました: %w", err)
	}

	return &mapData, nil
}

func (a *App) GetMapList(directory string) ([]string, error) {
	files, err := ioutil.ReadDir(directory)
	if err != nil {
		return nil, fmt.Errorf("ディレクトリの読み込みに失敗しました: %w", err)
	}

	// マップファイル一覧を格納
	var mapFiles []string
	for _, file := range files {
		if !file.IsDir() && strings.HasSuffix(file.Name(), ".map") {
			mapFiles = append(mapFiles, file.Name())
		}
	}

	return mapFiles, nil
}

func (a *App) SelectMapDirectory() (string, error) {
	dirPath, err := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "マップファイルが格納されているディレクトリを選択してください",
	})

	if err != nil {
		return "", fmt.Errorf("ディレクトリの読み込みに失敗しました: %w", err)
	}

	if dirPath == "" {
		return "", nil // ユーザーがキャンセルした場合
	}

	return dirPath, nil
}
