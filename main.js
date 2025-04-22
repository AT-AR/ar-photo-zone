
import { loadGLTF } from "https://cdn.jsdelivr.net/npm/mind-ar@1.1.7/dist/utils/three-utils.js";

document.querySelector("#startButton").addEventListener("click", async () => {
  document.querySelector("#startButton").style.display = "none";

  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.body,
    imageTargetSrc: "./marker.mind",
  });

  const {renderer, scene, camera} = mindarThree;
  const anchor = mindarThree.addAnchor(0);

  const texture = new THREE.TextureLoader().load("./assets/character.png");
  const geometry = new THREE.PlaneGeometry(1, 1);
  const material = new THREE.MeshBasicMaterial({map: texture, transparent: true});
  const plane = new THREE.Mesh(geometry, material);
  anchor.group.add(plane);

  document.querySelector("#scaleSlider").addEventListener("input", (e) => {
    const scale = parseFloat(e.target.value);
    plane.scale.set(scale, scale, 1);
  });

  document.querySelector("#capture").addEventListener("click", () => {
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
});
