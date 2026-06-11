import { burger } from "./burger.js";
import { header } from "./header.js";
import { pack, trainers } from "./source.js";
import { sliderInit } from "./trainer.js";
import { initTrainerModal } from "./trainer_modal.js";
import { renderPacks, activePack } from "./pack.js";
import { submitForm } from "./form.js";

header();
burger();

initTrainerModal();

renderPacks(pack);
activePack();
sliderInit();

submitForm();
