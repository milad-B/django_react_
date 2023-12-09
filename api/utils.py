from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer


def getNotesList(request):
    notes = Note.objects.all().order_by('-updated')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

def createNote(request):
    data = request.data
    note = Note.objects.create(
        body=data['body']
    )
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)






def getNoteDetail(request, pk):
    note = Note.objects.get(pk=pk)
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)

def updateNote(request, pk):
    note = Note.objects.get(pk=pk)
    serializer = NoteSerializer(note, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

def deleteNote(request, pk):
    note = Note.objects.get(pk=pk)
    note.delete()
    return Response(status=204)