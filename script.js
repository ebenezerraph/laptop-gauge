const saveButton = document.getElementById('save');
const keyActivity = document.getElementById('key-activity');

const ramInput = document.getElementById('ram');
const ramError = ramInput.nextElementSibling;

const storageInput = document.getElementById('storage');
const storageError = storageInput.nextElementSibling;

const processorCores = document.getElementById('processor-core');
const processorCoresError = processorCores.nextElementSibling;

const processorSpeed = document.getElementById('processor-speed');
const processorSpeedError = processorSpeed.nextElementSibling;

const gpuCore = document.getElementById('gpu-core');
const gpuCoreError = gpuCore.nextElementSibling;

const vram = document.getElementById('vram');
const vramError = vram.nextElementSibling;

const keyActivitiesModal = document.getElementById('key-activities-modal');

saveButton.onclick = () => {
     function updateValidity(inputElement, errorElement) {
          if (!inputElement.checkValidity()) {
               inputElement.classList.add('ring-red-500', 'focus:ring-red-500');
               errorElement.classList.remove('hidden', 'ring-gray-300', 'focus:ring-green-950');
          } else {
               inputElement.classList.remove('ring-red-500', 'focus:ring-red-500');
               errorElement.classList.add('hidden');
          }
     }

     // Call updateValidity for each input and error element pair
     updateValidity(ramInput, ramError);
     updateValidity(storageInput, storageError);
     updateValidity(processorCores, processorCoresError);
     updateValidity(processorSpeed, processorSpeedError);
     updateValidity(gpuCore, gpuCoreError);
     updateValidity(vram, vramError);


     // Assuming keyActivitiesModal should only be shown after all validations pass
     if (ramInput.checkValidity() && storageInput.checkValidity() && processorCores.checkValidity()) {
          keyActivitiesModal.classList.remove('hidden');
     }


     document.getElementById('close-modal-button').onclick = () => keyActivitiesModal.classList.add('hidden');
     document.getElementById('close-modal-button-close').onclick = () => keyActivitiesModal.classList.add('hidden');
     window.onclick = function (event) {
          if (event.target == keyActivitiesModal) {
               keyActivitiesModal.classList.add('hidden');
          }
     }

}



function syncClassToChecked(sourceId, targetId, className) {
     const sourceElement = document.getElementById(sourceId);
     const targetElement = document.getElementById(targetId);

     function log(message) {
          console.log(`[${new Date().toLocaleTimeString()}] ${message}`);
     }

     function updateTarget() {
          const hasClass = sourceElement.classList.contains(className);
          targetElement.checked = hasClass;
          log(`Source element ${sourceId} ${hasClass ? 'has' : 'does not have'} class "${className}". Checkbox is now ${hasClass ? 'checked' : 'unchecked'}.`);
     }

     // Initial check and update
     log('Initial sync');
     updateTarget();

     // Set up the observer
     const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
               if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    log('Class changed. Updating target.');
                    updateTarget();
               }
          });
     });

     // Start observing
     observer.observe(sourceElement, { attributes: true, attributeFilter: ['class'] });
     log('Started observing source element for class changes.');

     // Return a function to stop observing
     return () => {
          observer.disconnect();
          log('Stopped observing source element.');
     };
}

// Usage
syncClassToChecked("bar-with-underline-item-1", "core", "active");
syncClassToChecked("bar-with-underline-item-2", "ryzen", "active");
syncClassToChecked("bar-with-underline-item-3", "m1", "active");
syncClassToChecked("segment-item-1", "in-intel", "active");
syncClassToChecked("segment-item-2", "de-intel", "active");

// To stop syncing later:
// stopSync();