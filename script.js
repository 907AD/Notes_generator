const AddNote = document.querySelector("#Add");

const updtateLSdata = () => {
  const textAreaData = document.querySelectorAll('textarea');
  const notes = [];

  textAreaData.forEach((note) => {
    notes.push(note.value);
  });

  localStorage.setItem('notes', JSON.stringify(notes));
};

const addNewNote = (text = '') => {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
    <div class="operation">
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="text ${text ? "hidden" : ""}"></textarea>
  `;

  const editButton = note.querySelector(".edit");
  const deleteButton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textArea = note.querySelector(".text");

  textArea.value = text;
  mainDiv.innerHTML = text;

  deleteButton.addEventListener("click", () => {
    note.remove();
    updtateLSdata();
  });

  editButton.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
    textArea.focus();
  });

  textArea.addEventListener("input", (e) => {
    mainDiv.innerHTML = e.target.value;
    updtateLSdata();
  });

  document.body.appendChild(note);
};

const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) {
  notes.forEach(note => addNewNote(note));
}

AddNote.addEventListener("click", () => addNewNote());