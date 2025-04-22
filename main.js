
document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  const scaleSlider = document.getElementById("scaleSlider");
  const captureButton = document.getElementById("capture");

  startButton.addEventListener("click", async () => {
    startButton.style.display = "none";

    try {
      const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.body,
        imageTargetSrc: "https://cdn.jsdelivr.net/gh/AT-AR/ar-photo-zone@main/assets/marker.mind",
      });

      const { renderer, scene, camera } = mindarThree;
      const anchor = mindarThree.addAnchor(0);

      const texture = new THREE.TextureLoader().load("./assets/character.png");
      const geometry = new THREE.PlaneGeometry(1, 1);
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
      const plane = new THREE.Mesh(geometry, material);
      anchor.group.add(plane);

      scaleSlider.addEventListener("input", (e) => {
        const scale = parseFloat(e.target.value);
        plane.scale.set(scale, scale, 1);
      });

      captureButton.addEventListener("click", () => {
        renderer.render(scene, camera);
        const dataURL = renderer.domElement.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "photo.png";
        link.href = dataURL;
        link.click();
      });

      await mindarThree.start();
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    } catch (e) {
      alert("ARの起動に失敗しました。\n" + e.message + "\nSafariの設定でカメラを許可してください。");
    }
  });
});
