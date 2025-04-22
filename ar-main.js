
// ページが読み込まれたら処理開始
window.addEventListener('DOMContentLoaded', async () => {
  // 各要素を取得
  const startButton = document.getElementById("startButton");
  const scaleSlider = document.getElementById("scaleSlider");
  const captureButton = document.getElementById("capture");

  // スタートボタンが押された時の処理
  startButton.addEventListener("click", async () => {
    startButton.style.display = "none"; // ボタンを隠す

    try {
      // MindARの初期化：AR表示の基本セットアップ
      const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: "https://cdn.jsdelivr.net/gh/AT-AR/ar-photo-zone@main/assets/marker.mind", // マーカー画像
      });

      // Three.jsの基本構成を取り出す
      const { renderer, scene, camera } = mindarThree;
      const anchor = mindarThree.addAnchor(0); // マーカーに紐づくオブジェクトを設置

      // キャラクター画像をテクスチャとして読み込む
      const texture = new THREE.TextureLoader().load("./character.png");
      const geometry = new THREE.PlaneGeometry(1, 1); // 平面の大きさ
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
      const plane = new THREE.Mesh(geometry, material);
      anchor.group.add(plane); // マーカーに表示させる

      // スライダーでサイズ変更
      scaleSlider.addEventListener("input", (e) => {
        const scale = parseFloat(e.target.value);
        plane.scale.set(scale, scale, 1);
      });

      // 撮影ボタンでcanvasを画像として保存
      captureButton.addEventListener("click", () => {
        renderer.render(scene, camera); // 描画更新
        const dataURL = renderer.domElement.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "photo.png";
        link.href = dataURL;
        link.click();
      });

      // ARセッション開始
      await mindarThree.start();
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });

    } catch (e) {
      // 失敗した場合のエラーメッセージ
      alert("ARの起動に失敗しました。\n" + e.message + "\nカメラの許可設定をご確認ください。");
    }
  });
});
