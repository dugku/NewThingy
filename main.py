from fastapi import FastAPI, Request, Depends, HTTPException
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import json

import random
from sqlalchemy.orm import Session
from sqlalchemy import update
import random

import models
from databases import engine, SessionLocal

models.Base.metadata.create_all(bind =engine)

def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally: 
        db.close()

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

class Todo(BaseModel):
    task: str 
    due_date:str
    complete:bool = False

template = Jinja2Templates(directory='templates')

@app.get('/')
async def root(request: Request,db: Session = Depends(get_db)):

    tasks = db.query(models.TaskQue).all()

    # Transform the tasks into a list of dictionaries
    task_list = [{'task': task.String_Todo, 'due_date': task.due_date, 'complete': task.complete} for task in tasks]

    context = {
        'request': request, 
        'String': task_list
    }
    return template.TemplateResponse("base.html", context)

@app.post("/add_todos/")
async def input_Todo(todo: Todo, db: Session = Depends(get_db)):
    taskEntry = models.TaskQue(
        String_Todo = todo.task,
        due_date = todo.due_date    
    )
    db.add(taskEntry)
    db.commit()
    return {'message': "Completed"} 

@app.get("/get_todos", )   
async def get_todo(db: Session = Depends(get_db)):
    return db.query(models.TaskQue).all()

@app.delete('/delete/{task_id}')
async def delete_tas(task_id: int,db: Session = Depends(get_db)):
    change_complete = db.query(models.TaskQue).filter(models.TaskQue.task_id == task_id).delete()

    if change_complete == None:
        raise HTTPException(status_code=404, detail="Task not found")

    db.commit()
    return{"message":"Deleted"}