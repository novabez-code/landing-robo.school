import { burger } from "./burger.js";
import { header } from "./header.js";
import { pack, trainers } from "./source.js";
import { sliderInit, btnOn } from "./trainer.js";
import { initTrainerModal } from "./trainer_modal.js";
import { renderPacks, activePack } from "./pack.js";
import { submitForm } from "./form.js";
import { initAnalytics } from "./googl_analytics.js";
import { initTriggers, initYanTriggers } from "./analytics-triggers.js";
import { yandex_metrika_init } from "./yandex_metrika.js";
initAnalytics();
yandex_metrika_init();

header();
burger();

initTrainerModal();

renderPacks(pack);
activePack();
sliderInit();
btnOn();

submitForm();

initTriggers();
initYanTriggers();
