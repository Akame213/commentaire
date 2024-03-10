document.addEventListener("DOMContentLoaded", function () {
  // Fonction pour afficher un message d'erreur
  function showError(message) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.style.display = "block";
    errorMessage.innerHTML = `
            <div class="rounded-md bg-red-50 p-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-400" x-description="Heroicon name: mini/x-circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <div class="ml-3">
                        <h3 class="text-sm font-medium text-red-800">${message}</h3>
                    </div>
                </div>
            </div>
        `;
  }

  // Fonction pour ajouter un nouveau commentaire à la liste
  function addComment(firstName, lastName, message) {
    const commentList = document.getElementById("comment-list");
    const newComment = `
            <div class="flex space-x-4 text-sm text-gray-500">
                <div class="flex-1 py-10 border-t border-gray-200">
                    <h3 class="font-medium text-gray-900">${firstName} ${lastName}</h3>
                    <div class="prose prose-sm mt-4 max-w-none text-gray-500">
                        <p>${message}</p>
                    </div>
                </div>
            </div>
        `;

    commentList.insertAdjacentHTML("beforeend", newComment);
  }

  // Fonction pour gérer la soumission du formulaire
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Récupérer les valeurs du formulaire
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    let message = document.getElementById("message").value;

    // Limiter le commentaire à 500 caractères maximum
    message = message.slice(0, 500);

    // Vérifier si tous les champs sont remplis
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      message.trim() === ""
    ) {
      showError("Tous les champs doivent être remplis");
      return;
    }

    // Ajouter un nouveau commentaire à la liste
    addComment(firstName, lastName, message);

    // Réinitialiser le formulaire
    document.querySelector("form").reset();
    document.getElementById("error-message").style.display = "none";
  });

  // Mettre à jour le nombre de caractères restants pendant la saisie du commentaire
  document.getElementById("message").addEventListener("input", function () {
    const maxLength = 500;
    const currentLength = this.value.length;
    const charactersRemaining = maxLength - currentLength;
    document.getElementById(
      "message-max"
    ).textContent = `Max. ${charactersRemaining} caractères`;
  });
});
