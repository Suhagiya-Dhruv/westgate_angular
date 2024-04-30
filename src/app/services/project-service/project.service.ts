import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

export enum ProjectEndPoint {
  PROJECT_LIST = '/project/list',
  ADD_PROJECT = '/project/create',
  PROJECT_EDIT = '/project/update',
  DELETE_PROJECT = '/project/delete',
  PROJECT_DETAILS = '/project/get/',
  APPLY_PROJECT = "/project/apply",
  SORT_LIST_PROJECT = "/project/sortlist",
  SUMMARYQUESTION_LIST = "/summary-question/list/"
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl!: string;
  projectid!: any

  constructor(
    private httpClient: HttpClient,
  ) {
    this.baseUrl = environment.baseUrl;
    this.projectid = localStorage.getItem('projectID')
  }

  // getProjectList(payload: any): Observable<any> {
  //   return this.httpClient
  //     .get<any>(this.baseUrl + ProjectEndPoint.PROJECT_LIST, payload);
  // }

  getProjectList(params: { keyword: string, page: string, limit: string, applied: boolean, sortlist: boolean }): Observable<any> {
    const url = `${this.baseUrl}${ProjectEndPoint.PROJECT_LIST}`;

    let queryParams = new HttpParams();
    queryParams = queryParams.set('keyword', params.keyword || '');
    queryParams = queryParams.set('page', params.page);
    queryParams = queryParams.set('limit', params.limit);
    if (params.applied) {
      queryParams = queryParams.set('applied', params.applied);
    }
    if (params.sortlist) {
      queryParams = queryParams.set('sortlist', params.sortlist);
    }
    return this.httpClient.get<any>(url, { params: queryParams });
  }

  deleteProject(payload: any): Observable<any> {
    return this.httpClient
      .delete<any>(this.baseUrl + ProjectEndPoint.DELETE_PROJECT, payload);
  }

  editProject(projectId: string, payload: any): Observable<any> {
    return this.httpClient
      .patch<any>(this.baseUrl + ProjectEndPoint.PROJECT_EDIT + `/${projectId}`, payload);
  }

  addProject(payload: any): Observable<any> {
    return this.httpClient
      .post<any>(this.baseUrl + ProjectEndPoint.ADD_PROJECT, payload);
  }

  getProjectDetails(): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + ProjectEndPoint.PROJECT_DETAILS + this.projectid);
  }

  getSummaryQuestionList(projectId: string): Observable<any> {
    // Constructing query parameters
    const params = new HttpParams().set('projectId', projectId);

    // Using the params in the request
    return this.httpClient.get<any>(this.baseUrl + ProjectEndPoint.SUMMARYQUESTION_LIST, { params });
  }

  // Darshan
  getProjectDetailsById(projectId: string): Observable<any> {
    return this.httpClient
      .get<any>(this.baseUrl + ProjectEndPoint.PROJECT_DETAILS + projectId);
  }

  projectApply(payload : any): Observable<any> {
    return this.httpClient
      .patch<any>(this.baseUrl + ProjectEndPoint.APPLY_PROJECT, payload);
  }

  projectSortList(payload : any): Observable<any> {
    return this.httpClient
      .patch<any>(this.baseUrl + ProjectEndPoint.SORT_LIST_PROJECT, payload);
  }
}
